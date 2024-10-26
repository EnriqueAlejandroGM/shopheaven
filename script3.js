// script.js

$(document).ready(function() {
    // Switch between forms
    $('#show-register').on('click', function(e) {
        e.preventDefault();
        $('#login-form').hide();
        $('#register-form').show();
    });

    $('#show-login').on('click', function(e) {
        e.preventDefault();
        $('#register-form').hide();
        $('#login-form').show();
    });

    // Register form logic
    $('#register').on('submit', function(e) {
        e.preventDefault();

        const username = $('#register-username').val();
        const password = $('#register-password').val();
        const confirmPassword = $('#register-confirm-password').val();
        const message = $('#register-message');

        if (password !== confirmPassword) {
            message.text('Passwords do not match!').addClass('text-danger');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.find(user => user.username === username);

        if (userExists) {
            message.text('User already exists!').addClass('text-danger');
        } else {
            users.push({ username, password });
            localStorage.setItem('users', JSON.stringify(users));
            message.text('Registration successful! You can now login.').removeClass('text-danger').addClass('text-success');
        }
    });

    // Login form logic
    $('#login').on('submit', function(e) {
        e.preventDefault();

        const username = $('#login-username').val();
        const password = $('#login-password').val();
        const message = $('#login-message');

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            message.text('Login successful!').removeClass('text-danger').addClass('text-success');
            // Redirect to homepage
            window.location.href = "index.html";
        } else {
            message.text('Invalid username or password!').addClass('text-danger');
        }
    });
});
