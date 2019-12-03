const baseTemplate = `
<!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <style>
            * {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            .heading-container {
                height: 80px;
                display: flex;
                justify-content: center;
                align-items: center;
                background-color: #39d;
                color: #fff;
            }

            h1 {
                text-align: center;
            }

            h2 {
                color: #39d;
            }
        </style>
    </head>

    <body>
        <div class="heading-container">
            <h1>
                Welcome to your Information
            </h1>
        </div>
        <div class="table-of-content">
            <h2> Table of Contents</h2>
            <ul>
                <a href="#TransactionDetails">
                    <li>Transaction Details</li>
                </a>
                <a href="#VisitDetails">
                    <li>Visit Details</li>
                </a>
                <a href="#LoyaltyAndRewards">
                    <li>Loyalty and Rewards Details</li>
                </a>
            </ul>
        </div>
        <div>
            <h2 id="TransactionDetails">Transaction Details</h2>
            <ul>
                ${liForTransaction}
            </ul>
        </div>

        <div>
            <h2 id="VisitDetails">Visit Details</h2>
            <ul>
                ${liForTransaction}
            </ul>
        </div>

        <div>
            <h2 id="LoyaltyAndRewards">Loyalty & Rewards Details</h2>
            <ul>
                ${liForTransaction}
            </ul>
        </div>

    </body>

    </html>
`;

module.exports = baseTemplate;