var canvas = document.getElementById("myCanvas");
		var ctx = canvas.getContext("2d");
		
		canvas.width = 1518;
		canvas.height = window.innerHeight;

		// Set up particles
		var particleCount = 100;
		var particles = [];
		for (var i = 0; i < particleCount; i++) {
			particles.push(new Particle());
		}

		function Particle() {
			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height;
			this.vx = Math.random() * 2 - 1;
			this.vy = Math.random() * 2 - 1;
			this.radius = Math.random() * 4 + 1;
			this.color = "#ffffff";
		}

		function draw() {
			// Clear canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			// Update particle positions
			for (var i = 0; i < particleCount; i++) {
				var particle = particles[i];
				particle.x += particle.vx;
				particle.y += particle.vy;

				// Bounce off edges
				if (particle.x < 0 || particle.x > canvas.width) {
					particle.vx *= -1;
				}
				if (particle.y < 0 || particle.y > canvas.height) {
					particle.vy *= -1;
				}

				// Draw particle
				ctx.beginPath();
				ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
				ctx.fillStyle = particle.color;
				ctx.fill();
			}

			// Call draw function again
			requestAnimationFrame(draw);
		}

		// Start animation
		draw();