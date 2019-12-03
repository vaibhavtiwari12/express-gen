function templateGen (transactionData,VisitDetails, LoyaltyAndRewards, pdfData, videoData) {
    console.log("Starting to Generate the Template.");
    var liForTransaction = "";
    var liForpdfData = "";
    var liForVideoData = "";
    if(transactionData){
        transactionData.forEach(function(tran){
            liForTransaction = liForTransaction + `<li>${tran.date} - ${tran.paidAt}</li> \n`;
        })
    }
    if(pdfData) {
        pdfData.forEach(function(pdf){
            liForpdfData = liForpdfData + `<li><a href="${pdf.link}" download> ${pdf.name} </a></li> \n`;
        })
    }
    if(videoData) {
        videoData.forEach(function(video){
            liForVideoData = liForVideoData + `
            <video width="640" controls>
                <source src="${video.link}" type="video/mp4">
                Your browser does not support the video tag.
            </video></li> \n`;
        })
    }
    return `
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

            <div>
                <h2 id="PDFDetails">PDF Details</h2>
                <ul>
                    ${liForpdfData}
                </ul>
            </div>
            <div>
                <h2 id="VideoDetails">Video Details</h2>
                <ul>
                    ${liForVideoData}
                </ul>
            </div>

        </body>

        </html>
    `;
}
module.exports = templateGen;