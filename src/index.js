(function() {
    'use strict';

    CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
        if (w < 2 * r) {
            r = w / 2;
        }
        if (h < 2 * r) {
            r = h / 2;
        }
        this.beginPath();
        this.moveTo(x + r, y);
        this.arcTo(x + w, y, x + w, y + h, r);
        this.arcTo(x + w, y + h, x, y + h, r);
        this.arcTo(x, y + h, x, y, r);
        this.arcTo(x, y, x + w, y, r);
        this.closePath();
        return this;
    };

    var canvas = document.querySelector('canvas');
    var ctx = canvas.getContext('2d');
    var p = new Props();
    var game = new Game();
    var tiles = createTiles(game.numbers, p);
    var timer = new Timer();

    canvas.width = canvas.height = p.size;
    canvas.style.marginLeft = p.marginLeft + 'px';
    canvas.style.marginTop = p.marginTop + 'px';
    setEventListeners();
    drawStage();

    function createTiles(nums, p) {
        var arr = [],
            i = 0,
            x, y;

        nums.forEach(function (n, i) {
            if ( n ) {
                x = p.gap + (i % 4) * (p.tile + p.gap);
                y = p.gap + (Math.floor(i / 4)) * (p.tile + p.gap);
                arr[i] = new Tile(ctx, n.toString(), x, y, p.tile, p.gap);
            }
        });
        return arr;
    }

    function drawStage() {
        ctx.clearRect(0, 0, p.size, p.size);
        ctx.strokeStyle = '#193441';
        ctx.lineWidth = 6;
        ctx.strokeRect(0, 0, p.size, p.size);
        tiles.forEach(function(tile) {
            tile.draw();
        });
    }

    function setEventListeners() {
        canvas.addEventListener('mouseleave', onMouseLeave, false);
        canvas.addEventListener('click', onMouseClick, false);
        canvas.addEventListener('mousemove', onMouseMove, false);
    }

    function removeEventListeners() {
        canvas.removeEventListener('mouseleave', onMouseLeave);
        canvas.removeEventListener('click', onMouseClick);
        canvas.removeEventListener('mousemove', onMouseMove);
    }


    function onMouseLeave() {
        for (var i = 0; i < 15; i++) {
            tiles[i].c = '#193441';
        }
        canvas.style.cursor = 'auto';
        drawStage();
    }


    function onMouseClick(e) {
        var mouse = getMousePosition(canvas, e);
        for (var i = 0; i < 15; i++) {
            if ( pointInRect(mouse, tiles[i]) ) {
                var data = game.checkState(tiles[i].n);
                if ( data.move ) {
                    updateTiles(data);
                    drawStage();
                    if ( data.completed ) {
                        removeEventListeners();
                        for (var j = 0; j < 15; j++) {
                            tiles[j].c = '#FCFFF5';
                        }
                        canvas.style.cursor = 'auto';
                        timer.show();
                    }
                    drawStage();
                }
                break;
            }
        }
    }

    function updateTiles(d) {
        tiles.forEach(function(tile) {
            if ( d.arr.indexOf(tile.n) !== -1 ) {
                tile.move(d.move);
            }
        });
    }

    function setMovedStyles(i) {
        drawStage();
    }

    function onMouseMove(e) {
        var mouse = getMousePosition(canvas, e);
        var cursor = 'auto';
        for (var i = 0; i < 15; i++) {
            if ( pointInRect(mouse, tiles[i]) && game.checkLine(tiles[i].n)) {
                tiles[i].c = '#3E606F';
                cursor = 'pointer';
            }else  {
                tiles[i].c = '#193441';
            }
        }
        canvas.style.cursor = cursor;
        drawStage();
    }

    function getMousePosition(c, e) {
        var bcr = c.getBoundingClientRect();
        return {
            x: e.pageX - bcr.left,
            y: e.pageY - bcr.top
        };
    }

    function pointInRect (point, rect) {
        return inRange(point.x, rect.x, rect.x + rect.s) && inRange(point.y, rect.y, rect.y + rect.s);
    }

    function inRange (value, min, max) {
        return value >= Math.min(min, max) && value <= Math.max(min, max);
    }
})();
// FCFFF5 D1DBBD 91AA9D 3E606F 193441
