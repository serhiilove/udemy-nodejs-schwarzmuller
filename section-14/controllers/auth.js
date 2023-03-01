exports.getLogin = (req, res, next) => {
    const allCookies = req.get('Cookie').split(';');
    const isLoggedIn = allCookies[allCookies.length - 1].split('=')[1].trim() === 'true';

    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        isAuthenticated: isLoggedIn
    });
};

exports.postLogin = (req, res, next) => {
    res.setHeader('Set-Cookie', 'loggedIn=true');
    res.redirect('/');
}
