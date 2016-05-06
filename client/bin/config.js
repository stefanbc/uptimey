var config = {
    production: {},
    development: {
        url: '',
        mail: {
            transport: 'SMTP',
            options: {
                service: 'Mailgun',
                auth: {
                    user: '', // mailgun username
                    pass: ''  // mailgun password
                }
            }
        },
        server: {
            host: '127.0.0.1',
            port: '8080'
        }
    } 
}