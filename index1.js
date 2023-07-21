window.onload = function () {
    var hasJavaScript = false;
    if (navigator.userAgent.indexOf("JSDisabled") === -1) {
        // JavaScript is enabled
        hasJavaScript = true
    };

    if (hasJavaScript == true) {
        // alert("JavaScript is enabled! Website can be accessed.");

        document.querySelector(".startPage").style.display = "flex";
        // Get the headline elements
        const headline1 = document.querySelector(".headline-text1");
        const headline2 = document.querySelector(".headline-text2");
        const headline3 = document.querySelector(".headline-text3");

        // get the scoreboard elements
        const scoreBoard1 = document.querySelector(".scoreBoard-text1");
        const scoreBoard2 = document.querySelector(".scoreBoard-text2");

        // get the canvas element 
        const canvas = document.querySelector('canvas');
        const c = canvas.getContext('2d');

        // set the height nad width of the canvas 
        const canvasWidth = canvas.width = 1024;
        const canvasHeight = canvas.height = 676;
        console.log(screen.width)
        c.fillStyle = "black"
        c.fillRect(0, 0, canvasWidth, canvasHeight);

        const gravity = 0.2

        class sprite {
            constructor({ position, velocity }, { ballInfo }) {
                this.position = position
                this.velocity = velocity
                this.height = 240
                this.width = 80
                this.lastKey
                this.attackBox = {
                    position: this.position,
                    height: 30,
                    width: 120
                }
                this.ballInfo = ballInfo
                this.hittingBall
                this.hittingBall1
                this.startBalling = false
                // this.scoreBoard
                this.audiance
                this.number = 0
                this.score = 0
                this.wicket = 0
                this.numberOfBalls = 0
            }

            drawGround() {
                c.strokeStyle = "white";
                // player'side line
                c.beginPath(); // Start a new path
                c.moveTo(20, 606); // Move the pen to 
                c.lineTo(200, 546); // Draw a line to 
                c.stroke(); // Render the path

                c.beginPath(); // Start a new path
                c.moveTo(0, 656); // Move the pen to 
                c.lineTo(360, 526); // Draw a line to 
                c.stroke(); // Render the path

                // field uper line
                c.beginPath(); // Start a new path
                c.moveTo(0, 546); // Move the pen to 
                c.lineTo(canvasWidth, 546); // Draw a line to 
                c.stroke(); // Render the path

                // baller's side line
                c.beginPath(); // Start a new path
                c.moveTo(canvasWidth, 586); // Move the pen to 
                c.lineTo(canvasWidth - 140, 546); // Draw a line to 
                c.stroke(); // Render the path

                c.beginPath(); // Start a new path
                c.moveTo(canvasWidth, 625); // Move the pen to 
                c.lineTo(canvasWidth - 310, 526); // Draw a line to 
                c.stroke(); // Render the path

                // field lower line
                c.beginPath(); // Start a new path
                c.moveTo(0, 606); // Move the pen to 
                c.lineTo(canvasWidth, 606); // Draw a line to 
                c.stroke(); // Render the path

                // stadium
                c.fillStyle = "rgb(77, 77, 77)"
                c.fillRect(0, 296, canvasWidth, 50)
                c.strokeStyle = "black";
                c.beginPath(); // Start a new path
                c.moveTo(130, 297); // Move the pen to 
                c.lineTo(320, 345); // Draw a line to 
                c.stroke(); // Render the path

                c.beginPath(); // Start a new path
                c.moveTo(320, 297); // Move the pen to 
                c.lineTo(130, 345); // Draw a line to 
                c.stroke(); // Render the path

                c.beginPath(); // Start a new path
                c.moveTo(580, 297); // Move the pen to 
                c.lineTo(770, 345); // Draw a line to 
                c.stroke(); // Render the path

                c.beginPath(); // Start a new path
                c.moveTo(770, 297); // Move the pen to 
                c.lineTo(580, 345); // Draw a line to 
                c.stroke(); // Render the path
            }
            updateGround() {
                this.drawGround();
                // console.log("hehehe")
            }
            drawPlayer() {
                // player side's wicket 
                c.fillStyle = "white"
                c.fillRect(110, 410, 8, 150)
                c.fillRect(94, 415, 8, 150)
                c.fillRect(78, 420, 8, 150)

                // baller side's wicket 
                c.fillRect(1014, 420, 8, 150)
                c.fillRect(998, 415, 8, 150)
                c.fillRect(982, 410, 8, 150)

                // body
                c.fillStyle = "#5CE1E6"
                c.fillRect(this.position.x, this.position.y, this.width, this.height)

                // head
                c.fillStyle = "rgb(232,190,172)"
                c.fillRect(this.position.x - 8, this.position.y + 20, this.width + 21, 60)
                c.fillStyle = " rgb(20, 20, 20)"
                c.fillRect(this.position.x - 8, this.position.y + 20, 60, 30)
                c.fillRect(this.position.x - 8, this.position.y + 20, 40, 60)
                c.fillStyle = "rgb(232,190,172)"
                c.fillRect(this.position.x + 30, this.position.y + 40, 15, 20)

                c.fillStyle = "blue"
                c.fillRect(this.position.x - 8, this.position.y + 20, this.width + 35, 10)
                // head->helmet
                c.beginPath();
                c.arc(this.position.x + this.width / 2, this.position.y + 20, (this.width / 2) + 8, Math.PI,
                    0);
                c.fill();
                c.closePath();
                // head->helmet->mask
                c.fillStyle = "white"
                c.fillRect(this.position.x + this.width / 3, this.position.y + 30, 1, 50)
                c.fillRect(this.position.x + this.width / 3, this.position.y + 80, 75, 1)
                c.fillRect(this.position.x + (this.width / 3) + 15, this.position.y + 30, 1, 20)
                c.fillRect(this.position.x + (this.width / 3) + 15, this.position.y + 50, 60, 1)
                c.fillRect(this.position.x + (this.width / 3) + 75, this.position.y + 50, 1, 31)
                c.fillRect(this.position.x + (this.width / 3) + 24, this.position.y + 50, 1, 31)
                c.fillRect(this.position.x + (this.width / 3) + 36, this.position.y + 50, 1, 31)
                c.fillRect(this.position.x + (this.width / 3) + 48, this.position.y + 50, 1, 31)
                c.fillRect(this.position.x + (this.width / 3) + 60, this.position.y + 50, 1, 31)
                c.fillRect(this.position.x + (this.width / 3) + 72, this.position.y + 50, 1, 31)
                c.fillRect(this.position.x + this.width / 3, this.position.y + 68, 24, 1)
                c.fillRect(this.position.x + this.width / 3, this.position.y + 56, 24, 1)

                // player's waist
                c.fillStyle = "#5CE1E6"
                c.fillRect(this.position.x - 3, this.position.y + (this.height / 2) + 25, this.width + 6, 6)
                c.fillStyle = "rgb(0, 76, 255)"
                c.fillRect(this.position.x - 3, this.position.y + (this.height / 2) + 26.5, this.width + 6, 3)

                // shoes
                c.fillStyle = "white"
                // shoes->left shoe
                c.beginPath();
                c.arc(this.position.x + this.width / 4, this.position.y + this.height - 1, (this.width / 4) - 6, Math.PI,
                    0);
                c.fill();
                c.closePath();
                // shoes->right shoe
                c.beginPath();
                c.arc(this.position.x + this.width / 4 + this.width / 2, this.position.y + this.height - 1, (this.width / 4) - 6, Math.PI,
                    0);
                c.fill();
                c.closePath();

                // leg guard white line
                c.fillStyle = "white"
                c.fillRect(this.position.x + this.width / 2 - 1, this.position.y + this.height / 2 + 60, 2, 60)
                c.fillRect(this.position.x, this.position.y + this.height / 2 + 60, 2, 60)
                for (let i = this.position.x + 8; i < (this.position.x + this.width / 2 - 1); i = i + 6) {
                    c.fillRect(i, this.position.y + this.height / 2 + 60, 2, 50)
                }
                c.fillRect(this.position.x + this.width - 2, this.position.y + this.height / 2 + 60, 2, 60)
                for (let i = (this.position.x + this.width - 8); i > (this.position.x + this.width / 2 + 2); i = i - 6) {
                    c.fillRect(i, this.position.y + this.height / 2 + 60, 2, 50)
                }
                c.beginPath();
                c.arc(this.position.x + this.width / 4, this.position.y + this.height / 2 + 60, (this.width / 4) - 1, Math.PI,
                    0);
                c.lineWidth = 2;
                c.strokeStyle = "white";
                c.stroke();

                c.beginPath();
                c.arc(this.position.x + this.width / 2 + this.width / 4, this.position.y + this.height / 2 + 60, (this.width / 4) - 1, Math.PI,
                    0);
                c.lineWidth = 2;
                c.strokeStyle = "white";
                c.stroke();

                if (this.hittingBall1) {
                    c.beginPath(); // Start a new path
                    c.moveTo(this.position.x + 1, this.attackBox.position.y + (this.height / 3) + 5); // Move the pen to 
                    c.lineTo(this.position.x + 25, this.attackBox.position.y + (this.height / 3) + 20); // Draw a line to 
                    c.stroke(); // Render the path

                    c.beginPath(); // Start a new path
                    c.moveTo(this.position.x + 1, this.attackBox.position.y + (this.height / 3) + 25); // Move the pen to 
                    c.lineTo(this.position.x + 25, this.attackBox.position.y + (this.height / 3) + 40); // Draw a line to 
                    c.stroke(); // Render the path

                    c.beginPath(); // Start a new path
                    c.moveTo(this.position.x + 25, this.attackBox.position.y + (this.height / 3) + 20); // Move the pen to 
                    c.lineTo(this.position.x + 25, this.attackBox.position.y + (this.height / 3) + 40); // Draw a line to 
                    c.stroke(); // Render the path

                    for (let i = 30; i <= 40; i++) {
                        c.strokeStyle = "rgb(232,190,172)";
                        c.beginPath(); // Start a new path
                        c.moveTo(this.position.x + 26, this.attackBox.position.y + (this.height / 3) + i); // Move the pen to 
                        c.lineTo(this.position.x + this.width / 2, this.attackBox.position.y + (this.height / 3) + i + 10); // Draw a line to 
                        c.stroke(); // Render the path
                    }


                    c.strokeStyle = "white";
                    c.beginPath(); // Start a new path
                    c.moveTo(this.position.x + this.width - 1, this.attackBox.position.y + (this.height / 3) + 5); // Move the pen to 
                    c.lineTo(this.position.x - 25 + this.width, this.attackBox.position.y + (this.height / 3) + 20); // Draw a line to 
                    c.stroke(); // Render the path

                    c.beginPath(); // Start a new path
                    c.moveTo(this.position.x + this.width - 1, this.attackBox.position.y + (this.height / 3) + 25); // Move the pen to 
                    c.lineTo(this.position.x - 25 + this.width, this.attackBox.position.y + (this.height / 3) + 40); // Draw a line to 
                    c.stroke(); // Render the path

                    c.beginPath(); // Start a new path
                    c.moveTo(this.position.x - 25 + this.width, this.attackBox.position.y + (this.height / 3) + 20); // Move the pen to 
                    c.lineTo(this.position.x - 25 + this.width, this.attackBox.position.y + (this.height / 3) + 40); // Draw a line to 
                    c.stroke(); // Render the path

                    for (let i = 30; i <= 40; i++) {
                        c.strokeStyle = "rgb(232,190,172)";
                        c.beginPath(); // Start a new path
                        c.moveTo(this.position.x - 26 + this.width, this.attackBox.position.y + (this.height / 3) + i); // Move the pen to 
                        c.lineTo(this.position.x + this.width / 2, this.attackBox.position.y + (this.height / 3) + i + 10); // Draw a line to 
                        c.stroke(); // Render the path
                    }


                    // swing position of the bat
                    c.fillStyle = "rgb(250, 185, 21)"
                    // c.fillRect(this.attackBox.position.x + (this.width / 2) + 5, this.attackBox.position.y + (this.height / 2), 25, 8)
                    c.fillRect(this.attackBox.position.x + (this.width / 2), this.attackBox.position.y + (this.height / 2), 25, 8)

                    // c.fillRect(this.attackBox.position.x + (this.width / 2) + 5 + 25, this.attackBox.position.y + (this.height / 2) - (this.attackBox.height / 2) + 4, this.attackBox.width, this.attackBox.height)
                    c.fillRect(this.attackBox.position.x + (this.width / 2) + 25, this.attackBox.position.y + (this.height / 2) - (this.attackBox.height / 2) + 4, this.attackBox.width - 10, this.attackBox.height)
                    c.fillStyle = "grey"
                    c.fillRect(this.attackBox.position.x + (this.width / 2) + 35, this.attackBox.position.y + (this.height / 2) + 4, 90, 1)
                }
                else if (this.hittingBall1 != true) {
                    c.beginPath(); // Start a new path
                    c.moveTo(this.position.x + 1, this.attackBox.position.y + (this.height / 3) + 5); // Move the pen to 
                    c.lineTo(this.position.x + 25, this.attackBox.position.y + (this.height / 3) + 25); // Draw a line to 
                    c.stroke(); // Render the path

                    c.beginPath(); // Start a new path
                    c.moveTo(this.position.x + 1, this.attackBox.position.y + (this.height / 3) + 25); // Move the pen to 
                    c.lineTo(this.position.x + 25, this.attackBox.position.y + (this.height / 3) + 45); // Draw a line to 
                    c.stroke(); // Render the path

                    c.beginPath(); // Start a new path
                    c.moveTo(this.position.x + 25, this.attackBox.position.y + (this.height / 3) + 25); // Move the pen to 
                    c.lineTo(this.position.x + 25, this.attackBox.position.y + (this.height / 3) + 45); // Draw a line to 
                    c.stroke(); // Render the path

                    for (let i = 35; i <= 45; i++) {
                        c.strokeStyle = "rgb(232,190,172)";
                        c.beginPath(); // Start a new path
                        c.moveTo(this.position.x + 26, this.attackBox.position.y + (this.height / 3) + i); // Move the pen to 
                        c.lineTo(this.position.x + this.width / 2, this.attackBox.position.y + (this.height / 3) + i + 10); // Draw a line to 
                        c.stroke(); // Render the path
                    }


                    c.strokeStyle = "white";
                    c.beginPath(); // Start a new path
                    c.moveTo(this.position.x + this.width - 1, this.attackBox.position.y + (this.height / 3) + 5); // Move the pen to 
                    c.lineTo(this.position.x - 25 + this.width, this.attackBox.position.y + (this.height / 3) + 25); // Draw a line to 
                    c.stroke(); // Render the path

                    c.beginPath(); // Start a new path
                    c.moveTo(this.position.x + this.width - 1, this.attackBox.position.y + (this.height / 3) + 25); // Move the pen to 
                    c.lineTo(this.position.x - 25 + this.width, this.attackBox.position.y + (this.height / 3) + 45); // Draw a line to 
                    c.stroke(); // Render the path

                    c.beginPath(); // Start a new path
                    c.moveTo(this.position.x - 25 + this.width, this.attackBox.position.y + (this.height / 3) + 25); // Move the pen to 
                    c.lineTo(this.position.x - 25 + this.width, this.attackBox.position.y + (this.height / 3) + 45); // Draw a line to 
                    c.stroke(); // Render the path

                    for (let i = 35; i <= 45; i++) {
                        c.strokeStyle = "rgb(232,190,172";
                        c.beginPath(); // Start a new path
                        c.moveTo(this.position.x - 26 + this.width, this.attackBox.position.y + (this.height / 3) + i); // Move the pen to 
                        c.lineTo(this.position.x + this.width / 2, this.attackBox.position.y + (this.height / 3) + i + 10); // Draw a line to 
                        c.stroke(); // Render the path
                    }

                    // rest position of the bat
                    c.fillStyle = "rgb(250, 185, 21)"
                    // c.fillRect(this.attackBox.position.x + (this.width / 2) + 5 + (this.attackBox.height / 2) - 4, this.attackBox.position.y + (this.height / 2), 8, 25)
                    c.fillRect(this.attackBox.position.x + (this.width / 2) - 4, this.attackBox.position.y + (this.height / 2), 8, 25)

                    // c.fillRect(this.attackBox.position.x + (this.width / 2) + 5 + (this.attackBox.height / 2) - 15, this.attackBox.position.y + (this.height / 2) + 25, this.attackBox.height, this.attackBox.width)
                    c.fillRect(this.attackBox.position.x + (this.width / 2) - this.attackBox.height / 2, this.attackBox.position.y + (this.height / 2) + 25, this.attackBox.height, this.attackBox.width - 15)

                    c.fillStyle = "grey"
                    c.fillRect(this.attackBox.position.x + (this.width / 2), this.attackBox.position.y + (this.height / 2) + 35, 1, 85)
                }
            }
            updatePlayer() {
                this.drawPlayer()
                if ((this.position.x + this.velocity.x) <= 220 && (this.position.x + this.velocity.x) >= 140) {
                    this.position.x += this.velocity.x
                    // console.log(this.position.x)
                }
                // gravity property
                // this.position.y += this.velocity.y
                // if (this.position.y + this.height + this.velocity.y >= canvasHeight) {
                //     this.velocity.y = 0
                // }
                // else {
                //     this.velocity.y += gravity
                // }
            }
            hitAction() {
                this.hittingBall = true
                this.hittingBall1 = true
                // console.log("hello")
                setTimeout(() => {
                    this.hittingBall = false
                    this.hittingBall1 = false
                }, 200)
            }
            drawBall() {
                c.beginPath();
                c.arc(this.ballInfo.X, this.ballInfo.Y, this.ballInfo.ballRadius, 0, Math.PI * 2);
                c.fillStyle = "rgb(255, 0, 0)";
                c.fill();
                c.closePath();
            }
            updateBallPosition() {
                // c.clearRect(0, 0, canvasWidth, canvasHeight)
                if (1024 >= this.ballInfo.X - this.ballInfo.ballRadius >= 0) {
                    this.ballInfo.X += this.ballInfo.dx;
                    this.ballInfo.Y += this.ballInfo.dy;
                }

                if (this.ballInfo.X - this.ballInfo.ballRadius <= 0 || this.ballInfo.X - this.ballInfo.ballRadius >= 1024) {
                    this.ballInfo.X = canvasWidth + (10)
                    this.ballInfo.Y = canvasHeight - 340
                    this.ballInfo.dx = -6
                    this.ballInfo.dy = 3
                    this.startBalling = false
                    this.numberOfBalls = this.numberOfBalls + 1
                    console.log("ball count " + this.numberOfBalls)
                }


                // Check collision with the ground
                if (this.ballInfo.Y + this.ballInfo.dy > canvasHeight - 100 - this.ballInfo.ballRadius) {
                    this.ballInfo.dy = -(this.ballInfo.dy - 0.99); // Reverse vertical direction
                }

                this.drawBall();
            }

        }

        const player = new sprite({
            position: {
                x: 180,
                y: 336
            },
            velocity: {
                x: 0,
                y: 0
            }
        }, {})

        const ball = new sprite({}, {
            ballInfo: {
                ballRadius: 10,
                X: canvasWidth + (10),
                Y: canvasHeight - 340,
                dx: -6,
                dy: 3
            }
        })
        const ground = new sprite({}, {})

        const keys = {
            a: {
                pressed: false
            },
            d: {
                pressed: false
            },
            enter: {
                pressed: false
            },
            space: {
                pressed: false
            }
        }

        let gameFrame = 0;
        const straggerFrames = 150;
        function audianceAnimation() {

            requestAnimationFrame(audianceAnimation);
            c.fillStyle = 'black'
            c.fillRect(0, 0, canvasWidth, 296)
            c.fillStyle = 'rgb(2, 205, 19)'
            c.fillRect(0, 296, canvasWidth, canvasHeight)
            c.fillStyle = 'lightgreen'
            c.fillRect(0, 546, canvasWidth, 60)
            ground.updateGround()

            // audiance
            if (ground.audiance != false) {
                let count = 0
                // if (this.audiance = true) {

                for (let x = 0; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(255, 153, 204)"
                    }
                    else {
                        c.fillStyle = "rgb(102, 178, 255)"
                    }
                    // const x = 0
                    const y = -66
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);
                    count = count + 1;
                }
                for (let x = -25; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(255, 102, 102)"
                    }
                    else {
                        c.fillStyle = "rgb(255, 255, 153)"
                    }
                    // const x = 0
                    const y = -36
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);
                    count = count + 1;
                }
                for (let x = 0; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(153, 255, 204)"
                    }
                    else {
                        c.fillStyle = "rgb(204, 153, 255)"
                    }
                    // const x = 0
                    const y = -6
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);
                    count = count + 1;
                }
                for (let x = -25; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(255, 153, 204)"
                    }
                    else {
                        c.fillStyle = "rgb(102, 178, 255)"
                    }
                    // const x = 0
                    const y = 26
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);
                    count = count + 1;
                }
                for (let x = 0; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(255, 102, 102)"
                    }
                    else {
                        c.fillStyle = "rgb(255, 255, 153)"
                    }
                    // const x = 0
                    const y = 56
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);
                    count = count + 1;
                }
                for (let x = -25; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(153, 255, 204)"
                    }
                    else {
                        c.fillStyle = "rgb(204, 153, 255)"
                    }
                    // const x = 0
                    const y = 86
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);
                    count = count + 1;
                }
                for (let x = 0; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(255, 153, 204)"
                    }
                    else {
                        c.fillStyle = "rgb(102, 178, 255)"
                    }
                    // const x = 0
                    const y = 116
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);
                    count = count + 1;
                }
                for (let x = -25; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(255, 102, 102)"
                    }
                    else {
                        c.fillStyle = "rgb(255, 255, 153)"
                    }
                    // const x = 0
                    const y = 146
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);
                    count = count + 1;
                }
                for (let x = 0; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(153, 255, 204)"
                    }
                    else {
                        c.fillStyle = "rgb(204, 153, 255)"
                    }
                    // const x = 0
                    const y = 176
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);
                    count = count + 1;
                }
                for (let x = -25; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(255, 153, 204)"
                    }
                    else {
                        c.fillStyle = "rgb(102, 178, 255)"
                    }
                    // const x = 0
                    const y = 206
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);
                    count = count + 1;
                }

                for (let x = 0; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(255, 102, 102)"
                    }
                    else {
                        c.fillStyle = "rgb(255, 255, 153)"
                    }
                    // const x = 0
                    const y = 226
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);
                    count = count + 1;
                }
            }
            else if (ground.audiance == false) {
                let count = 0
                for (let x = 0; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(255, 153, 204)"
                    }
                    else {
                        c.fillStyle = "rgb(102, 178, 255)"
                    }
                    // const x = 0
                    const y = -66
                    c.fillRect(x + 3, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 6.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 40, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 43.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    // c.fillRect(x + 1, y + 50, 48, 14);
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);

                    count = count + 1;
                }
                for (let x = -25; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(255, 102, 102)"
                    }
                    else {
                        c.fillStyle = "rgb(255, 255, 153)"
                    }
                    // const x = 0
                    const y = -36
                    c.fillRect(x + 3, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 6.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 40, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 43.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    // c.fillRect(x + 1, y + 50, 48, 14);
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);

                    count = count + 1;
                }
                for (let x = 0; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(153, 255, 204)"
                    }
                    else {
                        c.fillStyle = "rgb(204, 153, 255)"
                    }
                    // const x = 0
                    const y = -6
                    c.fillRect(x + 3, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 6.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 40, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 43.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    // c.fillRect(x + 1, y + 50, 48, 14);
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);

                    count = count + 1;
                }
                for (let x = -25; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(255, 153, 204)"
                    }
                    else {
                        c.fillStyle = "rgb(102, 178, 255)"
                    }
                    // const x = 0
                    const y = 26
                    c.fillRect(x + 3, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 6.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 40, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 43.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    // c.fillRect(x + 1, y + 50, 48, 14);
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);

                    count = count + 1;
                }
                for (let x = 0; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(255, 102, 102)"
                    }
                    else {
                        c.fillStyle = "rgb(255, 255, 153)"
                    }
                    // const x = 0
                    const y = 56
                    c.fillRect(x + 3, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 6.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 40, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 43.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    // c.fillRect(x + 1, y + 50, 48, 14);
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);

                    count = count + 1;
                }
                for (let x = -25; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(153, 255, 204)"
                    }
                    else {
                        c.fillStyle = "rgb(204, 153, 255)"
                    }
                    // const x = 0
                    const y = 86
                    c.fillRect(x + 3, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 6.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 40, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 43.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    // c.fillRect(x + 1, y + 50, 48, 14);
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);

                    count = count + 1;
                }
                for (let x = 0; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(255, 153, 204)"
                    }
                    else {
                        c.fillStyle = "rgb(102, 178, 255)"
                    }
                    // const x = 0
                    const y = 116
                    c.fillRect(x + 3, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 6.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 40, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 43.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    // c.fillRect(x + 1, y + 50, 48, 14);
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);

                    count = count + 1;
                }
                for (let x = -25; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(255, 102, 102)"
                    }
                    else {
                        c.fillStyle = "rgb(255, 255, 153)"
                    }
                    // const x = 0
                    const y = 146
                    c.fillRect(x + 3, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 6.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 40, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 43.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    // c.fillRect(x + 1, y + 50, 48, 14);
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);

                    count = count + 1;
                }
                for (let x = 0; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(153, 255, 204)"
                    }
                    else {
                        c.fillStyle = "rgb(204, 153, 255)"
                    }
                    // const x = 0
                    const y = 176
                    c.fillRect(x + 3, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 6.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 40, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 43.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    // c.fillRect(x + 1, y + 50, 48, 14);
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);

                    count = count + 1;
                }
                for (let x = -25; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(255, 153, 204)"
                    }
                    else {
                        c.fillStyle = "rgb(102, 178, 255)"
                    }
                    // const x = 0
                    const y = 206
                    c.fillRect(x + 3, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 6.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 40, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 43.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    // c.fillRect(x + 1, y + 50, 48, 14);
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);

                    count = count + 1;
                }

                for (let x = 0; x < 1024; x = x + 60) {

                    if (count % 2 == 0) {
                        c.fillStyle = "rgb(255, 102, 102)"
                    }
                    else {
                        c.fillStyle = "rgb(255, 255, 153)"
                    }
                    // const x = 0
                    const y = 226
                    c.fillRect(x + 3, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 6.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 40, y + 20, 7, 46);
                    c.beginPath();
                    c.arc(x + 43.5, y + 20, 3.5, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    // c.fillRect(x + 1, y + 50, 48, 14);
                    c.beginPath();
                    c.arc(x + 25, y + 60, 22, Math.PI, 0);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.beginPath();
                    c.arc(x + 25, y + 25, 11, 0, Math.PI * 2);
                    // c.fillStyle = "red";
                    c.fill();
                    c.closePath();
                    c.fillRect(x + 3, y + 60, 44, 10);
                    count++
                }
            }

            // audiance
            if (gameFrame % straggerFrames == 0) {
                if (ground.audiance != false) {
                    ground.audiance = false
                }
                else if (ground.audiance == false) {
                    ground.audiance = true
                }
            }
            gameFrame++;
        }
        audianceAnimation();
        let lastKey
        let gameFrame1 = 0;
        function animation() {

            window.requestAnimationFrame(animation);
            player.updatePlayer()

            player.velocity.x = 0
            // player movement 
            if (keys.a.pressed && lastKey === 'a') {
                player.velocity.x = -1
            }
            else if (keys.d.pressed && lastKey === 'd') {
                player.velocity.x = 1
            }

            // player'bat and ball collision detection
            if (player.attackBox.position.x + 5 + player.attackBox.width + (player.width / 2) >= (ball.ballInfo.X - ball.ballInfo.ballRadius) &&
                player.attackBox.position.x + 5 + (player.width / 2) <= (ball.ballInfo.X + ball.ballInfo.ballRadius) &&
                player.attackBox.position.y + player.attackBox.height + (player.height / 2) - (player.attackBox.height / 2) >= (ball.ballInfo.Y - ball.ballInfo.ballRadius) &&
                player.attackBox.position.y + (player.height / 2) - (player.attackBox.height / 2) <= (ball.ballInfo.Y + ball.ballInfo.ballRadius) &&
                player.hittingBall) {
                player.hittingBall = false
                let printContent = "Playing "

                console.log("hit at (x,y)=" + "(" + ball.ballInfo.X + "," + ball.ballInfo.Y + ")")
                let hitType = player.position.x
                console.log("player at (x,y)=" + "(" + player.position.x + "," + player.position.y + ")")

                if (140 <= hitType && hitType <= 156) {
                    console.log("one run ")
                    // one run condition
                    ball.ballInfo.dx = 6
                    ball.ballInfo.dy = 1
                    printContent = "One"
                    player.score = player.score + 1

                }
                else if (156 < hitType && hitType <= 182) {
                    // two run condition 
                    console.log("two run")
                    ball.ballInfo.dx = 6
                    ball.ballInfo.dy = -0.2
                    printContent = "Two"
                    player.score = player.score + 2
                }
                else if (182 < hitType && hitType <= 198) {
                    // four run condition
                    console.log("four run")
                    ball.ballInfo.dx = 9
                    ball.ballInfo.dy = -4
                    printContent = "Four"
                    player.score = player.score + 4
                }
                else if (198 < hitType && hitType <= 214) {
                    // catch out condition
                    console.log("catch out")
                    ball.ballInfo.dx = 6
                    ball.ballInfo.dy = -5
                    printContent = "Catch Out"
                    player.wicket = player.wicket + 1
                }

                else if (214 < hitType && hitType <= 220) {
                    // six run condition
                    console.log("six run")
                    ball.ballInfo.dx = 9
                    ball.ballInfo.dy = -6
                    printContent = "Six"
                    player.score = player.score + 6
                }

                // console.log( headline)
                let img1 = document.createElement('img');
                img1.src = 'pepsi1.png';
                // headline1.appendChild(img1);
                headline1.innerText = printContent
                headline1.appendChild(img1);

                let img2 = document.createElement('img');
                img2.src = 'flipkart.png';
                // headline2.appendChild(img2);
                headline2.innerText = printContent
                headline2.appendChild(img2);

                let img3 = document.createElement('img');
                img3.src = 'amazon.png';
                // headline3.appendChild(img3);
                headline3.innerText = printContent
                headline3.appendChild(img3);

                gameFrame1++;
            }
            scoreBoard1.innerHTML = player.score
            scoreBoard2.innerHTML = player.wicket

            // start balling condition
            if (ball.startBalling != false) {
                ball.updateBallPosition()
            }

        }
        animation();

        window.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'd':
                    keys.d.pressed = true
                    lastKey = 'd'
                    break
                case 'a':
                    keys.a.pressed = true
                    lastKey = 'a'
                    break
                case ' ':
                    keys.space.pressed = true
                    player.hitAction()
                    break
                case 'Enter':
                    ball.startBalling = true
                    break
            }
            console.log(event.key)
        })

        window.addEventListener('keyup', (event) => {
            switch (event.key) {
                case 'd':
                    keys.d.pressed = false
                    break
                case 'a':
                    keys.a.pressed = false
                    break
                case ' ':
                    keys.space.pressed = false
                    break
                case 'Enter':
                    keys.enter.pressed = false
                    break
            }
        })
    }
    // else if (hasJavaScript != true) {
    //     window.alert("Please enable JavaScript to access this website.");
    // }
}
