$(document).ready(function () {
    const users = []; // Stores registered users
    let currentUser = null; // Tracks the logged-in user

    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Switch between login and register forms
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

    // Handle Registration
    $('#register-btn').on('click', function () {
        const email = $('#reg-email').val().trim();
        const password = $('#reg-password').val().trim();
        const role = $('#reg-role').val();

        $('#register-message').text(''); // Clear previous messages

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

        // Register the user
        users.push({ email, password, role });
        $('#register-message').text('Registration successful!').css('color', 'green');
        $('#reg-email').val('');
        $('#reg-password').val('');
    });

    // Handle Login
    $('#login-btn').on('click', function () {
        const email = $('#login-email').val().trim();
        const password = $('#login-password').val().trim();

        $('#login-message').text(''); // Clear previous messages

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

    // Show restricted content based on role
    function showRestrictedContent(user) {
        $('#auth-container').hide();
        $('#restricted-content').show();
        if (user.role === 'Admin') {
            $('#role-message').text('Welcome, Admin! You have full access.');
        } else {
            $('#role-message').text('Welcome, Client! Your access is limited.');
        }

        // Redirect to index.html after 5 seconds
        setTimeout(() => {
            window.location.href = "index.html";
        }, 5000); // 5000ms = 5 seconds
    }
});
