$(document).ready(function () {
    const users = []; 
    let currentUser = null; 

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    $('#register-tab').on('click', function () {
        $('#register-form').show();
        $('#login-form').hide();
        $(this).addClass('active');
        $('#login-tab').removeClass('active');
    });

    $('#login-tab').on('click', function () {
        $('#login-form').show();
        $('#register-form').hide();
        $(this).addClass('active');
        $('#register-tab').removeClass('active');
    });

    $('#register-btn').on('click', function () {
        const email = $('#reg-email').val().trim();
        const password = $('#reg-password').val().trim();
        const role = $('#reg-role').val();

        $('#register-message').text(''); 

        if (!isValidEmail(email)) {
            $('#register-message').text('Invalid email format!');
            return;
        }

        if (!email || !password) {
            $('#register-message').text('All fields are required!');
            return;
        }

        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            $('#register-message').text('Email already registered!');
            return;
        }

        users.push({ email, password, role });
        $('#register-message').text('Registration successful!').css('color', 'green');
        $('#reg-email').val('');
        $('#reg-password').val('');
    });

    $('#login-btn').on('click', function () {
        const email = $('#login-email').val().trim();
        const password = $('#login-password').val().trim();

        $('#login-message').text(''); 

        if (!isValidEmail(email)) {
            $('#login-message').text('Invalid email format!');
            return;
        }

        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            $('#login-message').text('Invalid email or password!');
            return;
        }

        currentUser = user;
        showRestrictedContent(user);
    });

    function showRestrictedContent(user) {
        $('#auth-container').hide();
        $('#restricted-content').show();
        if (user.role === 'Admin') {
            $('#role-message').text('Welcome, Admin! You have full access.');
        } else {
            $('#role-message').text('Welcome, Client! Your access is limited.');
        }

        setTimeout(() => {
            window.location.href = "index.html";
        }, 5000); 
    }
});
$(document).ready(function () {
    const globalEmail = "enrique.agm2177@gmail.com";
    let globalPassword = "123";  // Initial global password
    const users = [];  // Simulate user storage
    let currentUser = null;  // Simulate current logged-in user

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    $('#register-tab').on('click', function () {
        $('#register-form').show();
        $('#login-form').hide();
        $('#recover-form').hide();
        $('#reset-password-form').hide();
        $(this).addClass('active');
        $('#login-tab').removeClass('active');
        $('#recover-tab').removeClass('active');
    });

    $('#login-tab').on('click', function () {
        $('#login-form').show();
        $('#register-form').hide();
        $('#recover-form').hide();
        $('#reset-password-form').hide();
        $(this).addClass('active');
        $('#register-tab').removeClass('active');
        $('#recover-tab').removeClass('active');
    });

    $('#recover-tab').on('click', function () {
        $('#recover-form').show();
        $('#login-form').hide();
        $('#register-form').hide();
        $('#reset-password-form').hide();
        $(this).addClass('active');
        $('#login-tab').removeClass('active');
        $('#register-tab').removeClass('active');
    });

    $('#register-btn').on('click', function () {
        const email = $('#reg-email').val().trim();
        const password = $('#reg-password').val().trim();
        const role = $('#reg-role').val();

        $('#register-message').text('');

        if (!isValidEmail(email)) {
            $('#register-message').text('Invalid email format!');
            return;
        }

        if (!email || !password) {
            $('#register-message').text('All fields are required!');
            return;
        }

        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            $('#register-message').text('Email already registered!');
            return;
        }

        users.push({ email, password, role });
        $('#register-message').text('Registration successful!').css('color', 'green');
        $('#reg-email').val('');
        $('#reg-password').val('');
    });

    $('#login-btn').on('click', function () {
        const email = $('#login-email').val().trim();
        const password = $('#login-password').val().trim();

        $('#login-message').text('');

        if (!isValidEmail(email)) {
            $('#login-message').text('Invalid email format!');
            return;
        }

        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            $('#login-message').text('Invalid email or password!');
            return;
        }

        currentUser = user;
        showRestrictedContent(user);
    });

    function showRestrictedContent(user) {
        $('#auth-container').hide();
        $('#restricted-content').show();
        if (user.role === 'Admin') {
            $('#role-message').text('Welcome, Admin! You have full access.');
        } else {
            $('#role-message').text('Welcome, Client! Your access is limited.');
        }

        setTimeout(() => {
            window.location.href = "index.html";
        }, 5000);
    }

    // Handle password recovery
    $('#recover-btn').on('click', function () {
        const email = $('#recover-email').val().trim();
        $('#recover-message').text('');

        if (!isValidEmail(email)) {
            $('#recover-message').text('Invalid email format!');
            return;
        }

        if (email !== globalEmail) {
            $('#recover-message').text('Email not found!');
            return;
        }

        // If the email matches, show the reset password form
        $('#recover-form').hide();
        $('#reset-password-form').show();
    });

    // Handle password reset
    $('#reset-password-btn').on('click', function () {
        const newPassword = $('#new-password').val().trim();
        const confirmPassword = $('#confirm-password').val().trim();

        $('#reset-message').text('');

        if (!newPassword || !confirmPassword) {
            $('#reset-message').text('Both fields are required!');
            return;
        }

        if (newPassword !== confirmPassword) {
            $('#reset-message').text('Passwords do not match!');
            return;
        }

        // Update global password
        globalPassword = newPassword;
        $('#reset-message').text('Password reset successful!').css('color', 'green');

        // Optionally, redirect to login after reset
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    });
});
