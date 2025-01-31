const app = new Vue({
    el: '#app',
    data: {
        page: "index",
        res: {},
        categories: [],
        tovars: {},
        selCategory: 0,
        searchInputTovar: null,
        message: "",
        id: null,
        addTovarForm: {},
        addTovarResponse: null,
        userId: null,
        userToken: null,
        message: "",

        name: "",
        email: "",
        password: "",
        regResponse: null,
        logResponse: null,

        registerForm: {
            name: "",
            email: "",
            password: ""
        },

        addTovarForm: {
            number: null,
            kol: null,
            cena: null,
            name: "",
            category_id: null
        },

        loginForm: {
            email: "user@gmail.com",
            password: "user"
        },


        host: "http://kgvzcc-dm2.wsr.ru/laravel10/public/api"
    },
    /*массив*/
    /*объект*/
    mounted() {
        this.getCategory()
    },



    methods: {

        getCategory() {
            fetch(this.host + '/category')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.categories = data;
                })
        },
        getTovar() {
            fetch(this.host + '/tovar')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.tovars = data;
                })
        },

        getTovarByCategory() {
            fetch(this.host + '/category/' + this.selCategory + '/tovar')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.tovars = data;
                })
        },

        searchTovar() {
            fetch(this.host + '/search?query=' + this.searchInputTovar)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.tovars = data;
                })
        },

        addTovar() {

            fetch(this.host + '/tovar', {
                method: 'POST',
                body: JSON.stringify({
                    name: this.addTovarForm.name,
                    cena: this.addTovarForm.cena,
                    kol: this.addTovarForm.kol,
                    number: this.addTovarForm.number,
                    category_id: this.addTovarForm.category_id
                }),
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    "Accept": "application/json",
                    "Authorization": "Bearer " + "{this.userToken}"
                }
            })
                .then(response => response.json())
                .then(
                    data => {
                        console.log(data);
                        this.message = data.message;
                        this.id = data.id;
                        this.addTovarResponse = { status: response.status, body: data };
                    }
                )
                .catch(error => console.log('error', error));
        },

        register() {
            fetch(this.host + '/register', {
                method: 'POST',
                body: JSON.stringify({
                    name: this.registerForm.name,
                    email: this.registerForm.email,
                    password: this.registerForm.password
                }),
                headers: { "Content-Type": "application/json;charset=utf-8" }
            })
                .then(response => response.json().then(
                    data => {
                        console.log(data);
                        this.message = data.message;

                        this.regResponse = { status: response.status, body: data };
                    }
                ))
                .catch(error => {
                    console.error(error);
                    this.regResponse = { status: response.status, body: error };

                })
        },

        login() {
            fetch(this.host + '/login', {
                method: "POST",
                body: JSON.stringify({
                    email: this.loginForm.email,
                    password: this.loginForm.password,
                }),
                headers: {
                    "Content-Type": "application/json;charset=utf-8",
                    Accept: "application/json",
                },
            })
                .then((response) =>
                    response.json().then((data) => {
                        this.logResponse = { status: response.status, body: data };

                        if (data.id && data.token) {
                            window.localStorage.setItem("token", data.token);
                            window.localStorage.setItem("userid", data.id);
                            this.userToken = window.localStorage.getItem("token");
                            this.userId = window.localStorage.getItem("userid");
                        }
                    }),
                )
                .catch((error) => {
                    console.error(error);
                })
        }

    },





});