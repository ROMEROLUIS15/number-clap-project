const generateEmailTemplate = (code) => {
    return `
    <html>
    <head>
        <style>
            .email-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 20px;
                font-family: Arial, sans-serif;
            }
            .email-content {
                max-width: 600px;
                text-align: center;
                border: 1px solid #dddddd;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .code {
                font-size: 24px;
                font-weight: bold;
                margin: 20px 0;
                color: #333;
            }
            .footer {
                margin-top: 20px;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-content">
                <h1>Verificación de correo electrónico</h1>
                <p>Hola,</p>
                <p>Utiliza el siguiente código para recuperar tu contraseña:</p>
                <div class="code">${code}</div>
                <p>Este código es válido por 10 minutos.</p>
            </div>
         
        </div>
    </body>
    </html>
    `;
}

module.exports = generateEmailTemplate;
