// For more information see: http://emberjs.com/guides/routing/

OlaMagic.Router.map(function() {
    this.resource('dashboard', { path: '/dashboard/:uid' }, function() {
        this.route('pbx.numbers' , {path: '/numbers'});
    });
});

OlaMagic.Router.reopen({
    location: 'history'
});
