
export function signup(username, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
        alert("User already exists!");
        return false;
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    alert("Signup successful! Please log in.");
    return true;
}

export function login(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert("Login successful!");
        return true;
    } else {
        alert("Invalid email or password!");
        return false;
    }
}

export function getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null;
}

export function logout() {
    localStorage.removeItem('currentUser');
    alert("Logged out successfully!");
    window.location.href = 'Login.html';
}