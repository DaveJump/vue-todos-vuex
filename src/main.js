import Vue from 'vue';
import Router from 'vue-router';
import App from './App';

Vue.use(Router);

//router processing
let router = new Router();

['all','active','completed'].forEach(visibility => {
	router.on(visibility,{
		component: {App}
	});
});

router.afterEach(transition => {
	switch(transition.to.path.replace('/','')){
		case 'all':
			router.app.visibility = 'all';
			break;
		case 'active':
			router.app.visibility = 'active';
			break;
		case 'completed':
			router.app.visibility = 'completed';
			break;
	}
});

//start router
router.start(App,'#todosapp');
