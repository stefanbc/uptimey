var config = {
    production: {},
    development: {
        url: '',
        mail: {
            transport: 'SMTP',
            options: {
                service: 'Mailgun',
                auth: {
                    user: 'postmaster@sandboxb9e2cb5dcd2c45a7b33c70126e3784e5.mailgun.org', // mailgun username
                    pass: '9lpbfuu44up5'  // mailgun password
                }
            }
        },
        server: {
            host: '127.0.0.1',
            port: '8080'
        }
    } 
}