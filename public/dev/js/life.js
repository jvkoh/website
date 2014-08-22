var DEAD_COLOR = "#000000";
var RESOLUTION = [96, 48];
var KEY_LOCK_TIME = 125;
var HIGH_REFRESH = 125;
var LOW_REFRESH = 625;
var BORDER_COLOR = "#555555";
var LIFE_COLORS = [
    { age:0, color:"#99FF99" },
    { age:1, color:"#33FF33" },
    { age:2, color:"#77FF33" },
    { age:3, color:"#AAFF00" },
    { age:5, color:"#AAAA00" },
    { age:9, color:"#AAAA55" },
    { age:18, color:"#775533" }
];
var URL_SLICE_SIZE = 32;

/**
 * y is first, x is second.
 * That means that cells is an array of rows.
 */
function Life(el) {
    this.refresh_rate = HIGH_REFRESH;
    this.height = RESOLUTION[1];
    this.width = RESOLUTION[0];
    this.low_speed = false;
    this.wrap_screen = true;
    this.cells = []; // 2d matrix full of the actual cell objects
    this.cell_status = []; // used to do iteration calculations, 2d matrix full of boolean
    this.current_cell = null; // currently moused over cell
    this.element = el;
    this.message_lock = null;
    this.refresh_locked = false;
    this.key_lock = [];
    this.play = false;
    this.draw = false;
    this.erase = false;
    this.grid = false;
    this.show_url = false;
    this.show_grid = false;
    this.help = false;
    this.help_string = "\
---- Welcome to Conway\'s Game of Life! ----<br>\
<br>\
== Rules ==<br>\
- If a cell has less than 2 neighbors it dies of starvation<br>\
- If a cell has more than 3 neighbors it dies of overcrowding<br>\
- If a cell has 2 neighbors it survives (but will stay dead if it is already)<br>\
- If a cell has 3 neighbors it is born (and survives if it is already alive)<br>\
<br>\
== Controls ==<br>\
spacebar: play/pause the simulation<br>\
c: clear the screen<br>\
d: draw with the mouse<br>\
e: erase with the mouse<br>\
g: toggle grid<br>\
h: toggle this help menu<br>\
n: move through a single life iteration<br>\
s: save url for current life state<br>\
w: toggle screen wrapping<br>\
z: toggle simulation speed<br>\
<br>\
== Disclaimer ==<br>\
This is an artistic recreation of the <a href=\"http://en.wikipedia.org/wiki/Conway's_Game_of_Life\" target=\"_blank\">Game of Life</a> devised by John Horton Conway<br>\
";

    var height, width;
    height = $(window).height();
    width = $(window).width();
    this.element.css({
        margin:0,
        padding:0,
        width: width,
        height: height
    });

    this.buildCellStatuses = function() {
        for (y = 0; y < this.height; y++) {
            this.cell_status[y] = [];
            for (x = 0; x < this.width; x++) {
                this.cell_status[y][x] = 0;
            }
        }
    }

    this.appendElements = function() {
        // Add cells
        for (y = 0; y < this.height; y++) {
            this.cells[y] = [];
            for (x = 0; x < this.width; x++) {
                this.cells[y][x] = new Cell(x, y, this);
            }
        }

        // Add messaging elements
        this.element.append('<div id="life-message"></div>');
        this.message_el = this.element.find('#life-message');
        this.message_el.css({
            "z-index": 3,
            "font-size": 24,
            "font-family": "Courier, Courier New",
            "padding": 8,
            "position": "absolute",
            "top": 0,
            "left": 0,
            "color": "#FFFFFF"
        });
        this.message_el.hide();

        this.element.append('<div id="life-help"></div>');
        this.help_el = this.element.find('#life-help');
        this.help_el.css({
            "position": "absolute",
            "font-size": 18,
            "font-family": "Courier, Courier New",
            "margin": 20,
            "padding": 20,
            "border-radius": 5,
            "z-index": 2,
            "background-color": "#333333",
            "opacity": 0.8,
            "color": "#FFFFFF"
        });
        this.help_el.hide();
        this.help_el.html(this.help_string);
        this.help_el.find('a').css({
            "color": "#CCCCCC",
            "text-decoration": "none"
        });
    }

    this.init = function() {
        this.appendElements();
        this.buildCellStatuses();
        this.calculateSize();

        this.setLowSpeed(false, true);
        this.showHelp(true);
    }

    this.saveUrl = function() {
        window.location.hash = this.saveCells();
        this.showMessage('url saved');
    }

    this.calculateNum = function(cells) {
        var i, ret;
        ret = 0;
        for (i = 0; i < cells.length; i++) {
            if (cells[i].isAlive()) {
                ret += Math.pow(2,i);
            }
        }
        return ret;
    }

    this.saveCells = function() {
        var x, y, row, binary, ret_str, start;
        ret_str = "";

        // For each row (separated by ;)
        for (y = 0; y < this.height; y++) {

            row = this.cells[y];
            x = 0;
            // Turn it into a set of numbers (separated by ,)
            while (x < this.width) {
                start = x;
                x += URL_SLICE_SIZE;
                binary = this.calculateNum(row.slice(start, x));
                if (binary) {
                    ret_str += binary;
                }

                if (x < this.width) {
                    ret_str += ",";
                }
            }

            if ((y+1) < this.height) {
                ret_str += ";";
            }
        }

        return ret_str;
    }

    this.loadCells = function(cell_str) {
        var rows, x, y, row, i, j, cell_vals;

        rows = cell_str.split(";");
        rows = rows.map(function(row) { return row.split(","); });

        if (rows.length != this.height) {
            this.showMessage('error loading cells');
            return;
        }

        // For each row
        for (y = 0; y < rows.length; y++) {
            row = rows[y];
            x = 0;
            // Turn the numbers into rows!
            for (i = 0; i < row.length; i++) {
                cell_vals = parseInt(row[i],10).toString(2);

                while (cell_vals.length < URL_SLICE_SIZE) {
                    cell_vals = "0" + cell_vals;
                }

                cell_vals = cell_vals.split("").reverse();

                for (j = 0; j < cell_vals.length; j++) {
                    if (x >= this.width) {
                        this.showMessage('error loading cells');
                        return;
                    }

                    if (cell_vals[j] == "1") {
                        this.cells[y][x].born();
                    } else {
                        this.cells[y][x].die();
                    }
                    x++;
                }
            }
        }
    }

    this.calculateCellStatuses = function() {
        for (y = 0; y < this.height; y++) {
            for (x = 0; x < this.width; x++) {
                this.cell_status[y][x] = this.deadOrAlive(x,y);
            }
        }
    }

    this.refresh = function() {
        if (this.refresh_locked) {
            return;
        }
        this.refresh_locked = true;

        // calculation pass
        this.calculateCellStatuses();

        // implementation pass
        this.applyStatusToCells();

        this.refresh_locked = false;
        if (this.play) {
            setTimeout(this.refresh.bind(this), this.refresh_rate);
        }
    }

    this.applyStatusToCells = function() {
        for (y = 0; y < this.height; y++) {
            for (x = 0; x < this.width; x++) {
                cell = this.cells[y][x];
                should_live = this.cell_status[y][x];

                if (cell.isAlive() == should_live) {
                    cell.ageOnce();
                } else {
                    if (should_live) {
                        cell.born();
                    } else {
                        cell.die();
                    }
                }
            }
        }
    }

    // false = dead, true = alive
    this.deadOrAlive = function(x,y) {
        // Non existant cells are always dead!
        if (x >= this.width || y >= this.height || x < 0 || y < 0) {
            return false;
        }

        // Count Neighbors
        var neighbors_alive;
        neighbors_alive = 0;
        for (x_off = -1; x_off < 2; x_off++) {
            for (y_off = -1; y_off < 2; y_off++) {
                if (x_off == 0 && y_off == 0) {
                    continue;
                }

                var cur_x, cur_y;
                cur_x = x + x_off;
                cur_y = y + y_off;

                if (this.wrap_screen) {
                    // Wrap around X
                    if (cur_x < 0) {
                        cur_x = this.width - 1;
                    } else if (cur_x >= this.width) {
                        cur_x = 0;
                    }

                    // Wrap around Y
                    if (cur_y < 0) {
                        cur_y = this.height - 1;
                    } else if (cur_y >= this.height) {
                        cur_y = 0;
                    }

                } else {

                    // Wrap around X
                    if (cur_x < 0) {
                        continue;
                    } else if (cur_x >= this.width) {
                        continue;
                    }

                    // Wrap around Y
                    if (cur_y < 0) {
                        continue;
                    } else if (cur_y >= this.height) {
                        continue;
                    }
                }

                if (this.cells[cur_y][cur_x].age > 0) {
                    neighbors_alive += 1;
                }
            }
        }

        // Determine livelihood
        if (neighbors_alive < 2 || neighbors_alive > 3) {
            return false;
        } else if (neighbors_alive == 2) {
            return this.cells[y][x].isAlive();
        } else if (neighbors_alive == 3) {
            return true;
        }

        // This should never be hit
        return false;
    }

    this.calculateSize = function() {
        var cell_height, cell_width, height, width;

        height = $(window).height();
        width = $(window).width();
        this.element.css({
            width: width,
            height: height
        });

        cell_width = this.element.width() / this.width;
        cell_height = this.element.height() / this.height;

        this.cells.forEach(function(col) {
            col.forEach(function(cell) {
                cell.size(cell_width, cell_height);
            });
        });
    }

    this.throttleKey = function(key, func, proxy) {
        clearTimeout(this.key_lock[key]);
        var args;
        args = Array.prototype.slice.call(arguments, 2); // args = [proxy, arg1, arg2, arg3...]
        this.key_lock[key] = setTimeout(func.bind.apply(func, args), KEY_LOCK_TIME);
    }

    this.togglePlay = function(hide_message) {
        this.play = !this.play;

        if (this.play) {
            this.refresh();
        }

        if (!hide_message) {
            if (this.play) {
                this.showMessage("play");
            } else {
                this.showMessage("pause");
            }
        }
    }

    this.reset = function() {
        var x, y;
        for (y = 0; y < this.height; y++) {
            for (x = 0; x < this.width; x++) {
                this.cells[y][x].die();
            }
        }
        this.showMessage("screen cleared");
    }

    this.step = function() {
        if (!this.play) {
            this.refresh();
        }
    }


    this.setGrid = function(value) {
        this.grid = value;

        var x, y;
        for (y = 0; y < this.height; y++) {
            for (x = 0; x < this.width; x++) {
                this.cells[y][x].setCellBorder(value);
            }
        }
    }

    this.setLowSpeed = function(is_low_speed, hide_message) {
        this.low_speed = is_low_speed;

        if (this.low_speed) {
            this.refresh_rate = LOW_REFRESH;
        } else {
            this.refresh_rate = HIGH_REFRESH;
        }

        if (!hide_message) {
            if (this.low_speed) {
                this.showMessage("low speed");
            } else {
                this.showMessage("high speed");
            }
        }
    }

    this.setScreenWrapping = function(value) {
        this.wrap_screen = value;

        if (this.wrap_screen) {
            this.showMessage("screen wrapping enabled");
        } else {
            this.showMessage("screen wrapping disabled");
        }
    }

    this.setDraw = function(value) {
        this.draw = value;
        if (this.draw) {
            this.current_element.born();
        }
    }

    this.setErase = function(value) {
        this.erase = value;
        if (this.erase) {
            this.current_element.die();
        }
    }

    this.setCurrentElement = function(el) {
        this.current_element = el;
    }

    this.showHelp = function(show_help) {
        this.help = show_help;
        this.help_el.toggle(this.help);
    }

    this.showMessage = function(message) {
        clearTimeout(this.message_lock);
        this.message_el.html(message);
        this.message_el.show();
        this.message_lock = setTimeout(this.message_el.fadeOut.bind(this.message_el, 150), 1000);
    }

    /*
     * Keyboard/Mouse handling section
     *
     * space = 32   - pause/play
     * c = 67       - clear
     * d = 68       - draw
     * e = 69       - rease
     * g = 71       - toggle grid
     * h = 72       - toggle help
     * n = 78       - step
     * p = 80       - toggle screen wrapping
     * s = 83       - save to url
     * z = 90       - toggle refresh rate TODO make this a slider?
     */
    this.handleKeydown = function(event) {
        var key;
        key = event.keyCode;
        switch(key) {
            case 32: // spacebar - toggle play
                this.throttleKey(key, this.togglePlay, this);
                break;
            case 67: // c key - reset
                this.reset();
                break;
            case 68: // d key - draw
                this.setDraw(true);
                break;
            case 69: // e key - erase
                this.setErase(true);
                break;
            case 71: // g key - toggle grid
                this.throttleKey(key, this.setGrid, this, !this.grid);
                break;
            case 72: // h key - toggle help
                this.showHelp(!this.help);
                break;
            case 78: // n key - move one step
                this.throttleKey(key, this.step, this);
                break;
            case 83: // s key - save
                this.throttleKey(key, this.saveUrl, this);
                break;
            case 87: // w key - screen wrapping
                this.setScreenWrapping(!this.wrap_screen);
                break;
            case 90: // z key - toggle refresh rate
                this.setLowSpeed(!this.low_speed);
                break;
            default:
                //console.log(event.keyCode);
                break;
        }
    }

    this.handleKeyup = function(event) {
        switch(event.keyCode) {
            case 68: // d key - draw off
                this.setDraw(false);
                break;
            case 69: // e key - erase
                this.setErase(false);
                break;
        }
    }

    /*
     * Event handling functions
     */
    this.element.keydown(this.handleKeydown.bind(this));
    this.element.keyup(this.handleKeyup.bind(this));
    $(window).resize(this.calculateSize.bind(this));
}


/**
 * Age also determines life and death.
 * age <= 0 means that a cell is dead, the more negative the longer dead
 * age > 0 means that cell is alive, the more positive the longer alive
 *
 * Assumed that all other cells are of the same size and shape as this one is
 */
function Cell(x_pos, y_pos, parent_obj) {
    this.x = x_pos;
    this.y = y_pos;
    this.height = 0;
    this.width = 0;
    this.age = 0;
    this.has_lived = 0;
    this.life_obj = parent_obj;
    this.id = "cell-" + this.x + "-" + this.y;

    this.life_obj.element.append("<div id=" + this.id + " class=\"cell\"></div>");

    this.element = $('#' + this.id);
    this.element.css({
        position: "absolute",
        display: "block",
        "background-color": DEAD_COLOR,
        "z-index": 1
    });

    this.place = function() {
        var top_val, left_val, border_rad;
        top_val = this.y * this.height;
        left_val = this.x * this.width;
        this.element.css({
            top: top_val,
            left: left_val,
            height: this.height+1,
            width: this.width+1
        });
    }

    this.size = function(width, height) {
        this.height = height;
        this.width = width;
        this.place();
    }

    this.isAlive = function() {
        return (this.age > 0);
    }

    this.ageOnce = function() {
        // Do one aging
        if (this.age > 0) {
            this.age += 1;
        } else {
            this.age -= 1;
        }

        var i, life_color;
        for (i = LIFE_COLORS.length - 1 ; i > 0 ; i--) {
            life_color = LIFE_COLORS[i];
            if (this.age > life_color.age) {
                this.setColor(life_color.color);
                break;
            }
        }
    }

    this.setColor = function(color) {
        this.element.css({
            "background-color": color
        });
    }

    this.setCellBorder = function(value) {
        if (value) {
            this.element.css({
                "border": "1px solid " + BORDER_COLOR
            });
        } else {
            this.element.css({
                "border": "none"
            });
        }
    }

    this.die = function() {
        this.age = 0;
        this.setColor(DEAD_COLOR);
    }

    this.born = function() {
        this.age = 1;
        this.has_lived = true;
        this.setColor(LIFE_COLORS[0].color);
    }

    this.flip = function() {
        if (this.isAlive()) {
            this.die();
        } else {
            this.born();
        }
    }

    this.mouseoverAction = function() {
        this.life_obj.setCurrentElement(this);
        if (!this.life_obj.erase && this.life_obj.draw) {
            this.born();
        }
        if (this.life_obj.erase && !this.life_obj.draw) {
            this.die();
        }
    }

    /*
     * Event handling stuff
     */
    this.element.mouseover(this.mouseoverAction.bind(this));
}


$(document).ready(function() {
    var life, cells;
    life = new Life($('body'));
    life.init();

    cells = window.location.hash;
    if (cells) {
        life.loadCells(cells);
    }
});
