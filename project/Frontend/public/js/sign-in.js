// public/js/sign-in.js

// KHÔNG dùng DOMContentLoaded vì script được load sau khi DOM đã sẵn sàng
(function() {
    // Đợi một chút để đảm bảo React đã render xong
    setTimeout(function() {
        initSignInForms();
    }, 100);
})();

function initSignInForms() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');

    const registerLink = document.getElementById('register-link');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const loginLinkFromRegister = document.getElementById('login-link-from-register');
    const loginLinkFromForgot = document.getElementById('login-link-from-forgot');

    // Kiểm tra xem các element có tồn tại không
    if (!loginForm || !registerForm || !forgotPasswordForm) {
        console.error('Một hoặc nhiều form không tồn tại trong DOM');
        return;
    }

    function showForm(formToShow) {
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        forgotPasswordForm.style.display = 'none';

        formToShow.style.display = 'block';
        formToShow.classList.add('fade-in');
        
        // Remove fade-in class sau khi animation xong
        setTimeout(function() {
            formToShow.classList.remove('fade-in');
        }, 300);
    }

    // Event listeners cho navigation
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            showForm(registerForm);
        });
    }

    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            showForm(forgotPasswordForm);
        });
    }

    if (loginLinkFromRegister) {
        loginLinkFromRegister.addEventListener('click', function(e) {
            e.preventDefault();
            showForm(loginForm);
        });
    }

    if (loginLinkFromForgot) {
        loginLinkFromForgot.addEventListener('click', function(e) {
            e.preventDefault();
            showForm(loginForm);
        });
    }

    // Xử lý submit forms
    const forms = document.querySelectorAll('.signin-form, .signup-form, .forgot-form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Lấy form type
            let formType = 'unknown';
            if (form.classList.contains('signin-form')) formType = 'login';
            if (form.classList.contains('signup-form')) formType = 'register';
            if (form.classList.contains('forgot-form')) formType = 'forgot';
            
            console.log(formType + ' form submitted');

            // Logic xử lý ở đây
            // VD: gọi API, validation, etc.
            handleFormSubmit(form, formType);
        });
    });
}

function handleFormSubmit(form, formType) {
    // Lấy form data
    const formData = new FormData(form);
    const data = {};
    
    // Convert FormData to object
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    console.log('Form data:', data);
    
    // Ví dụ xử lý cho từng loại form
    switch(formType) {
        case 'login':
            // Gọi API login
            console.log('Đang đăng nhập...');
            // fetch('/api/login', { method: 'POST', body: JSON.stringify(data) })
            break;
            
        case 'register':
            // Gọi API register
            console.log('Đang đăng ký...');
            // fetch('/api/register', { method: 'POST', body: JSON.stringify(data) })
            break;
            
        case 'forgot':
            // Gọi API forgot password
            console.log('Đang gửi email reset password...');
            // fetch('/api/forgot-password', { method: 'POST', body: JSON.stringify(data) })
            break;
    }
}
