            const hamburger = document.getElementById('hamburger');
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('overlay');
            const body = document.body;
            const profileSection = document.getElementById('profile-section');
            const modal = document.getElementById('modalMessage');
            let profile = [
                            {
                                profileImage: "https://picsum.photos/200/200?random=1",
                                profileName: "Sarah Johnson",
                                profileTitle: "Frontend Developer",
                                Description: "Bersemangat dalam membuat antarmuka pengguna yang indah dan fungsional menggunakan teknologi web modern."
                            },
                            {
                                profileImage: "https://picsum.photos/200/200?random=2",
                                profileName: "Michael Chen",
                                profileTitle: "Backend Engineer",
                                Description: "Spesialis dalam membangun sistem server yang scalable dan efisien dengan fokus pada keamanan dan performa."
                            },
                            {
                                profileImage: "https://picsum.photos/200/200?random=3",
                                profileName: "Emily Rodriguez",
                                profileTitle: "UI/UX Designer",
                                Description: "Menciptakan pengalaman pengguna yang intuitif dan menarik dengan pendekatan human-centered design."
                            },
                            {
                                profileImage: "https://picsum.photos/200/200?random=4",
                                profileName: "David Wilson",
                                profileTitle: "Full Stack Developer",
                                Description: "Menguasai kedua sisi frontend dan backend untuk memberikan solusi teknologi yang komprehensif dan terintegrasi."
                            }
                        ];

            profile.forEach((item, index) => {
                const div =document.createElement('div');

                div.innerHTML = `
                    <div class="profile-card">
                        <img src="${item.profileImage}" alt="Profile" class="profile-image">
                        <h2 class="profile-name">${item.profileName}</h2>
                        <p class="profile-title">${item.profileTitle}</p>
                        <p class="profile-description">
                            ${item.Description}
                        </p>
                        <div class="profile-actions">
                            <button class="btn btn-follow">Follow</button>
                            <button class="btn btn-message" data-index="${index}">Message</button>
                            <button class="btn btn-contact">Contact</button>
                        </div>
                    </div>
                    `;
                profileSection.appendChild(div);
                console.log(profileSection);
            })

            hamburger.addEventListener('click', () => {
                hamburger.classList.add('active');
                sidebar.classList.add('active');
                overlay.classList.add('active');
                lockScroll();
            });

            overlay.addEventListener('click', () => {
                hamburger.classList.remove('active');
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                modal.classList.remove('active');
                unlockScroll();
            })

            document.querySelectorAll('.sidebar-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                    unlockScroll();
                });
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    hamburger.classList.remove('active');
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                    unlockScroll();
                }
            });

            document.querySelector('.sidebar-close').addEventListener('click', () => {
                hamburger.classList.remove('active');
                sidebar.classList.remove('active');
                overlay.classList.remove('active');
                unlockScroll();
            })

            profileSection.addEventListener('click', (e) => {
                if (e.target.classList.contains('btn-message')) {
                    const index = e.target.dataset.index;
                    const user = profile[index];
                    const div = document.createElement('div');

                    div.innerHTML = `
                        <div class="modal-header">
                            <img src="${user.profileImage}" 
                                alt="foto-user" 
                                class="modal-avatar" 
                                id="modalAvatar">

                            <small class="modal-username" id="modalUsername">${user.profileName}</small>

                            <button class="modal-close" id="modalClose">×</button>
                        </div>

                        <div class="modal-body">
                            <label for="messageInput">Pesan</label>

                            <textarea id="messageInput" class="modal-input" rows="4" placeholder="Tulis pesan..."></textarea>

                            <button class="modal-send" id="modalSend">Kirim</button>
                        </div>
                    `

                    modal.innerHTML = "";
                    modal.appendChild(div);
                    modal.classList.add('active');

                    const modalClose = div.querySelector('#modalClose');
                    modalClose.addEventListener('click', () => {
                    modal.classList.remove('active');
                    });

                    const modalSend = document.getElementById('modalSend');
                    modalSend.addEventListener('click', () => {
                        document.getElementById('messageInput').value = "";
                        setTimeout(() => {
                            modal.classList.remove('active');
                        }, 150);
                    });
                }
            })

            let scrollPosition = 0;

            function lockScroll() {
                scrollPosition = window.pageYOffset;

                body.style.overflowY = 'scroll';

                window.addEventListener('scroll', freezeScroll);
                window.addEventListener('wheel', preventScroll, { passive: false });
                window.addEventListener('touchmove', preventScroll, { passive: false });
            }

            function unlockScroll() {
                window.removeEventListener('scroll', freezeScroll);
                window.removeEventListener('wheel', preventScroll);
                window.removeEventListener('touchmove', preventScroll);

                body.style.overflowY = '';
            }

            function freezeScroll() {
                window.scrollTo(0, scrollPosition);
            }

            function preventScroll(e) {
                e.preventDefault();
            }
