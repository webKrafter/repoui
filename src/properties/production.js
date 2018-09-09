const GITHUB_API = 'https://api.github.com/';

module.exports = {
    host: '//localhost:9600',
    GITHUB_API: {
        BASE: GITHUB_API,
        ALL_REPOS: `${ GITHUB_API }repositories`
    }
};