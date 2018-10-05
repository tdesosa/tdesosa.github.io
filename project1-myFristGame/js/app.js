// CREATE GAME GRID

for(let y = 15; y > 0; y--){
 
    $('.col-10').append(`<div class='row game-row-${y}'></div>`)
    for(let x = 1; x < 16; x++){
        const gameSquare = $('<div/>')
        gameSquare.addClass('square')
        gameSquare.addClass(`square-${x}-${y}`)
        $(`.game-row-${y}`).append(gameSquare)
    }
}

// CREATE CHARACTER AND APPLY ARROW KEY MOVEMENTS

$(`.square-8-15`).attr('id', 'lander')
$('body').keydown((event)=>{
    if(event.which == 40){
        //moveDown()
    }else if(event.which == 37){
        moveLeft();
    }else if(event.which == 39){
        moveRight();
    }
    
});

const lander = {
    x: 8,
    y: 15,
    }

// let moveDown = () => {
//     if(lander.y <= 15 && lander.y > 1){
//         const currentSquare = $('#lander');
//         currentSquare.removeAttr('id');
//         lander.y--;
//         $(`.square-${lander.x}-${lander.y}`).attr('id', 'lander');
//         console.log("moving on down");
//     }
// }

const moveLeft = () => {
    if(lander.x <= 15 && lander.x > 1){
        const currentSquare = $('#lander');
        currentSquare.removeAttr('id');
        lander.x--;
        $(`.square-${lander.x}-${lander.y}`).attr('id', 'lander');
    }
}

const moveRight = () => {
    if(lander.x < 15 && lander.x >= 1){
        const currentSquare = $('#lander');
        currentSquare.removeAttr('id');
        lander.x++;
        $(`.square-${lander.x}-${lander.y}`).attr('id', 'lander');
    }
}

// CREATE SPEED ASSIST (CLOUDS)

const speedAssistArray = [];
class SpeedAssist {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        $(`.square-${this.x}-${this.y}`).addClass('speedAssist');
        speedAssistArray.push(this);
    }
} 

// STATIC IMAGES FOR WHEN PAGE LOADS ON LEVEL 1

$(`.square-1-15`).attr('id', 'sun');
new SpeedAssist(1, 13);
new SpeedAssist(1, 9);
new SpeedAssist(1, 5);

// IMPLEMENT A TIMER & WIN/LOSE GAME ALERTS & COLLISION DETECTION

let timeOne = 12;

const timePasses = () => {
    const interval = setInterval(() => {
        if(timeOne > 0){
            timeOne--;
            $('.timeDisplay').text(`Timer: ${timeOne}s`).attr('id', 'timer');
            for(let i=0; i < speedAssistArray.length; i++){
                moveSpeedAssist(speedAssistArray[i]);
            };
            if(timeOne % .5 === 0){
                const yCoordinate = Math.floor(Math.random()* 12 + 3);
                new SpeedAssist(1, yCoordinate)
            }
            if(timeOne % .5 === 0){
            dropLander();
            }
        }
        if($('.speedAssist#lander').length > 0){
            dropLander();
            if(timeOne <= 11){
                $('#swooshSound')[0].play();
                $('.swooshDisplay').text(`Speeding Up!`).attr('id', 'swoosh');
                setTimeout(removeSwooshDisplay, 500);
            }
        }
        else if($('.square-1-1#lander').length > 0 || $('.square-2-1#lander').length > 0 || $('.square-3-1#lander').length > 0 || $('.square-4-1#lander').length > 0 || $('.square-5-1#lander').length > 0 || $('.square-7-1#lander').length > 0 || $('.square-8-1#lander').length > 0 || $('.square-9-1#lander').length > 0 || $('.square-10-1#lander').length > 0 || $('.square-11-1#lander').length > 0 || $('.square-12-1#lander').length > 0 || $('.square-13-1#lander').length > 0 || $('.square-14-1#lander').length > 0 || $('.square-15-1#lander').length > 0){
            $('.missedTargetModal').modal()
            clearInterval(interval);
        }
        else if(timeOne === 0){
            $('.timesUpModal').modal()
            clearInterval(interval);
        }
        else if($('.landingPad#lander').length > 0){
            $('.safeLandingModal').modal()
            clearInterval(interval);
        }   
    }, 1000);
};

// START BUTTON

$('.startButton').on('click', () => {
    timePasses();
    $(`.square-6-1`).addClass('landingPad');
});

// RESTART BUTTON

$('.restartButton').on('click', () => {
    window.location.reload(true);
});

// HOW TO PLAY BUTTON

$('.howToPlayButton').on('click', () => {
    $('.howToPlayModal').modal()
});

// TIMES UP MODAL RESTART

$('.timesUpRestartBtn').on('click', () => {
    window.location.reload(true);
});

// MISSED TARGET MODAL RESTART

$('.missedTargetRestartBtn').on('click', () => {
    window.location.reload(true);
});

// FINAL RESTART MODAL

$('.finalRestartModal').on('click', () => {
    window.location.reload(true);
});


// MOVE SPEED ASSISTS (CLOUDS)

moveSpeedAssist = (newSpeedAssist) => {
    if(newSpeedAssist.x <= 15) {
        $(`.square-${newSpeedAssist.x}-${newSpeedAssist.y}`).removeClass('speedAssist');
        newSpeedAssist.x++;
        $(`.square-${newSpeedAssist.x}-${newSpeedAssist.y}`).addClass('speedAssist');
    }
};

// LEVEL TWO SPEED ASSISTS (CLOUD) MOVEMENTS

moveSpeedAssistLevelTwo = (newSpeedAssist) => {
    if(newSpeedAssist.x <= 15) {
        $(`.square2-${newSpeedAssist.x}-${newSpeedAssist.y}`).removeClass('speedAssistTwo');
        newSpeedAssist.x++;
        $(`.square2-${newSpeedAssist.x}-${newSpeedAssist.y}`).addClass('speedAssistTwo');
    }
};

// LANDER DROPPING MOVEMENT

dropLander = () => {
    if(lander.y <= 15 && lander.y > 1){
        $(`.square-${lander.x}-${lander.y}`).removeAttr('id');
        lander.y--;
        $(`.square-${lander.x}-${lander.y}`).attr('id', 'lander');
    }
};

// SWOOSH DISPLAY RESET

removeSwooshDisplay = () => {
    $('#swoosh').empty();
    
}



// LEVEL TWO IMPLEMENTED BELOW//

// TARGET REACHED/MODAL TO LOAD LEVEL 2

$('.levelTwoBtn').on('click', () => {
    $('.col-10').empty();

    $('.levelDisplay').empty();
    $('.levelDisplay').text("Level 2");

    $levelTwoButton = $('<button type="button" class="btn btn-primary beginLevelTwoButton">Begin Level 2</button>')
    $('.startButton').replaceWith($levelTwoButton);

    clearInterval(timePasses);
    let timeTwo = 12;
    $('.timeDisplay').text(`Timer: ${timeTwo}s`).attr('id', 'timer');
   
 

    // CREATE GRID FOR LEVEL 2

    for(let y = 15; y > 0; y--){
 
        $('.col-10').append(`<div class='row game2-row-${y}'></div>`)
        for(let x = 1; x < 16; x++){
            const gameSquareTwo = $('<div/>')
            gameSquareTwo.addClass('square2')
            gameSquareTwo.addClass(`square2-${x}-${y}`)
            $(`.game2-row-${y}`).append(gameSquareTwo)
        }
    }
    
    // CREATE CHARACTER && CHARACTER MOVEMENTS FOR LEVEL 2'
    
    $(`.square2-8-15`).attr('id', 'landerTwo');

    const landerTwo = {
        x: 8,
        y: 15,
    }

    $('body').keydown((event)=>{
        if(event.which == 40){
            //moveDown()
        }else if(event.which == 37){
            moveLeftTwo();
        }else if(event.which == 39){
            moveRightTwo();
        }
        
    });

    const moveLeftTwo = () => {
        if(landerTwo.x <= 15 && landerTwo.x > 1){
            const currentSquare = $('#landerTwo');
            currentSquare.removeAttr('id');
            landerTwo.x--;
            $(`.square2-${landerTwo.x}-${landerTwo.y}`).attr('id', 'landerTwo');
        }
    }

    const moveRightTwo = () => {
        if(landerTwo.x < 15 && landerTwo.x >= 1){
            const currentSquare = $('#landerTwo');
            currentSquare.removeAttr('id');
            landerTwo.x++;
            $(`.square2-${landerTwo.x}-${landerTwo.y}`).attr('id', 'landerTwo');
        }
    }

    // LEVEL TWO DROPPING LANDER MOVEMENT

    dropLanderTwo = () => {
        if(landerTwo.y <= 15 && landerTwo.y > 1){
            $(`.square2-${landerTwo.x}-${landerTwo.y}`).removeAttr('id');
            landerTwo.y--;
            $(`.square2-${landerTwo.x}-${landerTwo.y}`).attr('id', 'landerTwo');
        }
    };

    // CREATE SPEED ASSIST (CLOUDS) FOR LEVEL 2

    const speedAssistArrayTwo = [];
    class SpeedAssistTwo {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            $(`.square2-${this.x}-${this.y}`).addClass('speedAssistTwo');
            speedAssistArrayTwo.push(this);
        }
    } 

    // STATIC IMAGES FOR WHEN LEVEL 2 PAGE LOADS

    $(`.square2-1-15`).attr('id', 'moon');
    new SpeedAssistTwo(1, 13);
    new SpeedAssistTwo(1, 9);
    new SpeedAssistTwo(1, 5);

    // TIMER FOR LEVEL 2

    const timePassesTwo = () => {
    const intervalTwo = setInterval(() => {
        if(timeTwo > 0){
            timeTwo--;
            $('.timeDisplay').text(`Timer: ${timeTwo}s`).attr('id', 'timer');
            for(let i = 0; i < speedAssistArrayTwo.length; i++){
                moveSpeedAssistLevelTwo(speedAssistArrayTwo[i])
            };
            if(timeTwo % 2 === 0){
                const yCoordinate = Math.floor(Math.random()* 12 + 3);
                new SpeedAssistTwo(1, yCoordinate)
            }
            if(timeTwo % 1 === 0){
            dropLanderTwo();
            }
        }
        if($('.speedAssistTwo#landerTwo').length > 0){
            dropLanderTwo();
            if(timeTwo <= 19){
                $('#swooshSound')[0].play();
                $('.swooshDisplay').text(`Speeding Up!`).attr('id', 'swoosh');
                setTimeout(removeSwooshDisplay, 500);
            }
        }
        else if($('.square2-1-1#landerTwo').length > 0 || $('.square2-2-1#landerTwo').length > 0 || $('.square2-3-1#landerTwo').length > 0 || $('.square2-4-1#landerTwo').length > 0 || $('.square2-5-1#landerTwo').length > 0 || $('.square2-6-1#landerTwo').length > 0 || $('.square2-7-1#landerTwo').length > 0 || $('.square2-8-1#landerTwo').length > 0 || $('.square2-9-1#landerTwo').length > 0 || $('.square2-10-1#landerTwo').length > 0 || $('.square2-11-1#landerTwo').length > 0 || $('.square2-12-1#landerTwo').length > 0 || $('.square2-13-1#landerTwo').length > 0 || $('.square2-15-1#landerTwo').length > 0){
            $('.missedTargetModal').modal()
            clearInterval(intervalTwo);
        }
        else if(timeTwo === 0){
            $('.timesUpModal').modal()
            clearInterval(intervalTwo);
        }
        else if($('.landingPadTwo#landerTwo').length > 0){
            $('.finalModal').modal()
            clearInterval(intervalTwo);
        }   
    }, 1000);
    };

    // START TIMER TWO

    $('.beginLevelTwoButton').on('click', () => {
        timePassesTwo();
        $(`.square2-14-1`).addClass('landingPadTwo');
    });


});



