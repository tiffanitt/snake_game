$(document).ready(function () {
    var canvas = $("#canvas")[0];
    var canvasContext = canvas.getContext("2d");
    var width = $("#canvas").width();
    var height = $("#canvas").height();
    var gameLoopInterval;
    var snakeBody;
    var cellWidth = 10;
    var currentDirection;
    var food;
    var score;
    var highScore = 0;


    function gameLoop() {
        var nextPosition = getNextPosition();
        var ateFood = checkEatFood(nextPosition);

    if(checkGameOver(nextPosition, snakeBody)) {
        gameOver();
        return;
    }
    if(!ateFood) {
    // Remove the tail of the snake
    snakeBody.pop();
    }
    // Add the next position
    // to the front of our snakeBody
    snakeBody.unshift(nextPosition);
        paintCanvas();
    }



    // Get the next position of the snake
    function getNextPosition() {
         // First let's grab the snake's head's x and y
        var currentPosition = snakeBody[0];
        var nextPosition = {
            x: currentPosition.x,
            y: currentPosition.y
    };

    // Increment the x or y value depending on what
    // direction the snake is going
        if (currentDirection == "right") nextPosition.x++;
        else if (currentDirection == "left") nextPosition.x--;
        else if (currentDirection == "up") nextPosition.y--;
        else if (currentDirection == "down") nextPosition.y++;

        return nextPosition;

    }

    // Check if snake has collided with walls or itself
    function checkGameOver(position, snakeBody) {
          if(position.x == -1 || position.x == width / cellWidth) {
              alert("Game Over");
            // If the snake has gone off the left or right boundaries, game over!
            return true;

        } else if(position.y == -1 || position.y == height / cellWidth) {
              alert("Game Over");
            // If the snake has gone off the top or bottom boundaries, game over!
            return true;
        } else {
            // If the snake's next position collides with another cell in it's body, game over!
            for (var i = 0; i < snakeBody.length; i++) {
                if (snakeBody[i].x == position.x && snakeBody[i].y == position.y) {
                    return true;
                }
            }
            return false;
        }

    }

    // Create a random piece of food
    function createFood() {
        food = {
            x: Math.round(Math.random() * (width - cellWidth) / cellWidth),
            y: Math.round(Math.random() * (height - cellWidth) / cellWidth)
        };
    }
    // Check if snake is on the same space as food
    function checkEatFood(position) {
        if (position.x == food.x && position.y == food.y) {

         // The snake is eating the food
        // Create a new piece of food, which removes this current one
            // If we ate a piece of food, increase our score
        createFood();
        score++;

        // Update the high score
        highScore = Math.max(highScore, score);

        return true;
        } else {
            return false;
        }
    }

    // Paint the snake and food
    function paintCanvas() {

        canvasContext.fillStyle = "black";
        canvasContext.fillRect(0, 0, width, height);
        canvasContext.strokeStyle = "black";
        canvasContext.strokeRect(0, 0, width, height);
         // Paint the score text

        canvasContext.strokeStyle = "blue";

        // Paint the snake body
        for (var i = 0; i < snakeBody.length; i++) {
            var cell = snakeBody[i];
            paintCell(cell.x, cell.y, "pink");
        }
        // Paint the food
        paintCell(food.x, food.y, "green");

        // Paint the score text
        var scoreText = "Score: " + score;
        canvasContext.fillStyle = "yellow";
        canvasContext.fillText(scoreText, 5, height - 5);

         // Paint the highscore text
        var highScoreText = "High Score: " + highScore;
        canvasContext.fillText(highScoreText, 5, height - 20);
    }

    function paintCell(x, y,color) {
        canvasContext.fillStyle = color;
        canvasContext.fillRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
        canvasContext.strokeStyle = "white";
        canvasContext.strokeRect(x * cellWidth, y * cellWidth, cellWidth, cellWidth);
    }

    function startGame() {
          // Set initial score to 0
        score = 0;
        createSnake();
        createFood();
        // Default the snake going right
        currentDirection = "right";
        gameLoopInterval = setInterval(gameLoop, 60);
    }
    $(document).on('click','#start', function(){
        startGame();
    });

    function createSnake() {
        var length = 5;
        snakeBody = [];
        for(var i = length - 1; i >= 0; i--) {
            snakeBody.push({x: i, y: 0});
        }
    }

         // Let's set up the arrow keys for our game
    $(document).keydown(function (e) {
        var key = e.which;

        // This will change the direction of the snake
        // Make sure we check that the user isn't trying to have the snake go backwards
        if (key == "37" && currentDirection != "right") currentDirection = "left";
        else if (key == "38" && currentDirection != "down") currentDirection = "up";
        else if (key == "39" && currentDirection != "left") currentDirection = "right";
        else if (key == "40" && currentDirection != "up") currentDirection = "down";
    });

    function gameOver() {
        clearInterval(gameLoopInterval);
        var x;
            if (confirm("Restart Game?") == true) {
                x = "Restart?";
                startGame();
            }
    }

});

