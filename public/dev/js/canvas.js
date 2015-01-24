window.REFRESH_RATE = 40;
window.requestAFrame = (function(callback) {
    return window.requestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.mozRequestAnimationFrame
        || window.oRequestAnimationFrame
        || window.msRequestAnimationFrame
        || function(callback) {
            window.setTimeout(callback, 1000/window.REFRESH_RATE);
        };
})();

function Base(properties) {
    var base = {
        extend: function extend(opts) {
            for (var property in opts) {
                if (property) {
                    this[property] = opts[property];
                }
            }

            return this;
        }
    };

    base.extend(properties);
    return base;
}

function World(properties) {
    var world = Base(properties).extend({
        _start: function _start() {
            this.canvas = document.getElementById(this.canvas_id);
            this.context = this.canvas.getContext('2d');
            this._time = this._getTime();

            this.canvas.width = this.width;
            this.canvas.height = this.height;

            this._initObjects();
            this._animate.call(this);
        },

        _initObjects: function _initObjects() {
            this._objects = {};
            for (var id in this.objects) {
                this._objects[id] = this._initObject(this.objects[id]);
            }
        },

        _initObject: function _initObject(spec) {
            spec.properties.world = this;

            var object = spec.construct.call(null);
            object.extend(spec.properties);

            if (object.init) {
                object.init();
            }

            return object;
        },

        getObject: function getObject(id) {
            return _this.objects[id];
        },

        _getTime: function _getTime() {
            return (new Date()).getTime();
        },

        _animate: function _animate() {
            this._delta = this._getTime() - this._time;
            this.context.clearRect(0, 0, this.width, this.height);

            for (var id in this._objects) {
                if (id) {
                    var obj = this._objects[id];
                    if (obj) {
                        obj.draw(this._delta);
                    }
                }
            }

            this._time = this._time + this._delta;
            window.requestAFrame(this._animate.bind(this));
        }
    });

    world._start();
    return world;
}

function Square(properties) {
    return Base(properties).extend({
        draw: function draw() {
            var context = this.world.context;
            context.fillStyle = this.color;
            context.fillRect(
                this.start[0], this.start[1],
                this.end[0], this.end[1]
            );
        }
    });
}

function Line(properties) {
    return Base(properties).extend({
        draw: function draw() {
            var context = this.world.context;
            context.beginPath();
            context.lineWidth = this.thickness.toString();
            context.strokeStyle = this.color;
            context.moveTo(this.start[0], this.start[1]);
            context.lineTo(this.end[0], this.end[1]);
            context.stroke();
        }
    });
}

function LineStar(properties) {
    return Base(properties).extend({
        init: function init() {
            this.lines = [];
            this.angle_increment = (2 * Math.PI / this.points);
            for (var i = 0; i < this.points; i++) {
                this.lines.push(Line({
                    world: this.world,
                    thickness: this.thickness,
                    color: this.color,
                    start: this.center,
                    angle: this.angle_increment * i
                }));
            }
        },

        updateLines: function updateLines(delta) {
            var updateLine = function updateLine(line) {
                line.angle += this.angle_increment * this.speed * delta;
                line.end = [
                    this.center[0] + (this.radius * Math.cos(line.angle)),
                    this.center[1] + (this.radius * Math.sin(line.angle))
                ];
            };

            this.lines.forEach(updateLine.bind(this));
        },

        draw: function draw(delta) {
            this.updateLines(delta);
            this.lines.forEach(function(line) {
                line.draw();
            });
        }
    });
}

var STAR_THICKNESS = 3,
    STAR_SPEED = .0012;


var world = World({
    canvas_id: "canvas",
    width: 1600,
    height: 900,
    objects: {
        bg: {
            construct: Square,
            properties: {
                color: 'black',
                start: [0,0],
                end: [1600,900]
            }
        },
        ls_tl: {
            construct: LineStar,
            properties: {
                center: [0,0],
                radius: 1200,
                thickness: STAR_THICKNESS,
                speed: STAR_SPEED,
                color: 'purple',
                points: 36
            }
        },
        ls_bl: {
            construct: LineStar,
            properties: {
                center: [0,900],
                radius: 1200,
                thickness: STAR_THICKNESS,
                speed: STAR_SPEED,
                color: 'purple',
                points: 36
            }
        },
        ls_ml: {
            construct: LineStar,
            properties: {
                center: [0,450],
                radius: 1200,
                thickness: STAR_THICKNESS,
                speed: STAR_SPEED,
                color: 'purple',
                points: 36
            }
        },
        ls_tml: {
            construct: LineStar,
            properties: {
                center: [533,0],
                radius: 1200,
                thickness: STAR_THICKNESS,
                speed: STAR_SPEED,
                color: 'purple',
                points: 36
            }
        },
        ls_bml: {
            construct: LineStar,
            properties: {
                center: [533,900],
                radius: 1200,
                thickness: STAR_THICKNESS,
                speed: STAR_SPEED,
                color: 'purple',
                points: 36
            }
        },
        ls_tr: {
            construct: LineStar,
            properties: {
                center: [1600,0],
                radius: 1200,
                thickness: STAR_THICKNESS,
                speed: -STAR_SPEED,
                color: 'purple',
                points: 36
            }
        },
        ls_br: {
            construct: LineStar,
            properties: {
                center: [1600,900],
                radius: 1200,
                thickness: STAR_THICKNESS,
                speed: -STAR_SPEED,
                color: 'purple',
                points: 36
            }
        },
        ls_mr: {
            construct: LineStar,
            properties: {
                center: [1600,450],
                radius: 1200,
                thickness: STAR_THICKNESS,
                speed: -STAR_SPEED,
                color: 'purple',
                points: 36
            }
        },
        ls_tmr: {
            construct: LineStar,
            properties: {
                center: [1066,0],
                radius: 1200,
                thickness: STAR_THICKNESS,
                speed: -STAR_SPEED,
                color: 'purple',
                points: 36
            }
        },
        ls_bmr: {
            construct: LineStar,
            properties: {
                center: [1066,900],
                radius: 1200,
                thickness: STAR_THICKNESS,
                speed: -STAR_SPEED,
                color: 'purple',
                points: 36
            }
        }
    }
});
