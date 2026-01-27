document.addEventListener('DOMContentLoaded', function() {
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const confirmBtn = document.getElementById('confirmBtn');
    const confirmationModal = document.getElementById('confirmationModal');
    const finalMessage = document.getElementById('finalMessage');
    const heart = document.getElementById('heart');
    const clickCounter = document.getElementById('clickCounter');
    const bgMusic = document.getElementById('bgMusic'); 
    const playMusicBtn = document.getElementById('playMusic');
    
    let clickCount = 0;
    const totalClicksNeeded = 8;
    let yesBtnSize = 1;

    // Function to handle playing audio safely on mobile
    function startAudio() {
        if (bgMusic) {
            bgMusic.play()
                .then(() => {
                    if(playMusicBtn) {
                        playMusicBtn.textContent = 'Music Playing 🎶';
                        playMusicBtn.style.opacity = "0.5";
                        playMusicBtn.disabled = true;
                    }
                })
                .catch(error => console.log("Audio waiting for user tap"));
        }
    }

    // 1. Play Music Button (Primary Unlock)
    if (playMusicBtn) {
        playMusicBtn.addEventListener('click', startAudio);
    }

    // 2. YES Button (Secondary Unlock for Mobile)
    yesBtn.addEventListener('click', function() {
        // This ensures music starts even if she skipped the first button
        startAudio(); 
        confirmationModal.classList.add('show');
    });

    // 3. NO Button Runaway
    noBtn.addEventListener('mouseover', function() {
        const x = Math.random() * 100 - 50;
        const y = Math.random() * 100 - 50;
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
    });

    // 4. Confirmation logic
    confirmBtn.addEventListener('click', function() {
        clickCount++;
        clickCounter.textContent = totalClicksNeeded - clickCount;
        
        // Grow effect
        yesBtnSize += 0.2;
        yesBtn.style.transform = `scale(${yesBtnSize})`;
        
        confirmationModal.classList.remove('show');
        
        if (clickCount >= totalClicksNeeded) {
            finalMessage.classList.add('show');
            yesBtn.style.display = 'none';
            noBtn.style.display = 'none';
            celebrate();
        } else {
            setTimeout(() => { confirmationModal.classList.add('show'); }, 300);
        }
    });

    // 5. Animations
    setInterval(() => {
        const container = document.querySelector('.floating-hearts');
        if(!container) return;
        const heartEl = document.createElement('div');
        heartEl.classList.add('floating-heart');
        heartEl.innerHTML = '❤️';
        heartEl.style.left = Math.random() * 100 + 'vw';
        container.appendChild(heartEl);
        setTimeout(() => heartEl.remove(), 8000);
    }, 600);

    function celebrate() {
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    setTimeout(() => { if(heart) heart.classList.add('show'); }, 1000);
});