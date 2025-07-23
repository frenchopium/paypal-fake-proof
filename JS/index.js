const paypalBody = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet">
    <title>Confirmation de paiement PayPal</title>
    <style>
        body {
            font-family: 'Lato', sans-serif;
            background: linear-gradient(to bottom, #e9eff7, #ffffff); /* Light blue/grey to white gradient */
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            overflow: hidden; /* Prevent body scrollbar */
        }

        .card-container {
            background-color: white;
            border-radius: 10px;
            padding: 30px;
            text-align: center;
            max-width: 450px; /* Slightly wider for better spacing */
            width: 90%;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            position: relative; /* For the top left icon */
            overflow: auto; /* Allow content inside card to scroll if needed */
        }

        .paypal-logo {
            width: 100px; /* Adjust size as needed */
            margin-bottom: 20px;
        }

        h2 {
            font-size: 24px;
            color: #333;
            margin-bottom: 10px;
            line-height: 1.3;
        }

        p {
            font-size: 16px;
            color: #555;
            line-height: 1.5;
            margin-bottom: 15px;
        }

        .email-text {
            font-weight: bold;
            color: #333;
            word-break: break-all; /* Ensure long emails wrap */
        }

        .interaction-box {
            background-color: #0070ba; /* PayPal Blue */
            color: white;
            padding: 15px 25px; /* Added horizontal padding */
            border-radius: 5px;
            margin: 20px 0;
            cursor: pointer;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: flex-start; /* Align content to the start (left) */
            text-align: left; /* Ensure text inside is left-aligned */
        }

        .interaction-box img {
            margin-right: 10px; /* Space between icon and text */
        }

        .btn-primary {
            background-color: #0070ba; /* PayPal Blue */
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 25px; /* Pill-shaped button */
            font-size: 18px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            margin-top: 20px;
            transition: background-color 0.2s;
        }

        .btn-primary:hover {
            background-color: #005ea6; /* Darker blue on hover */
        }

        .secondary-link {
            color: #0070ba; /* PayPal Blue */
            text-decoration: none;
            margin-top: 15px;
            display: block;
            font-size: 16px;
            transition: text-decoration 0.2s;
        }

        .secondary-link:hover {
            text-decoration: underline;
        }

        /* Responsive adjustments */
        @media (max-width: 600px) {
            .card-container {
                margin: 20px;
                padding: 20px;
            }
            h2 {
                font-size: 20px;
            }
            .btn-primary {
                width: 100%;
                box-sizing: border-box; /* Include padding in width */
            }
        }
    </style>
</head>

<body>
    <div class="card-container">
        <img src="img/PayPal_Logo.png" alt="PayPal Logo" class="paypal-logo">

        <h2>Vous avez envoyé <span class="email-text">{{VALUEPRICE}}</span> en cadeau à</h2>
        <p class="email-text">{{VALUEEMAIL}}</p>

        <p>Nous informerons <span class="email-text">{{VALUEEMAIL}}</span> que vous lui avez envoyé l'argent.</p>

        <div class="interaction-box">
            <span>Dites-nous comment cette transaction s'est déroulée</span>
        </div>

        <p>Nous informerons <span class="email-text">{{VALUEEMAIL}}</span> que vous lui avez envoyé un cadeau. Les détails seront disponibles dans votre Activité.</p>

        <button type="button" onclick="goHome()" class="btn btn-primary">Envoyer un autre cadeau</button>
        <a href="#" onclick="goHome()" class="secondary-link">Accéder au Récapitulatif</a>
    </div>

    <script>
        goHome = () => {
            window.location = "index.html"
        }
    </script>
</body>
</html>
`
paypalProofGen = () => {
    const price = document.getElementById("price").value
    const category = document.getElementById("category").value
    const email = document.getElementById("email").value

    console.log("Email from input:", email); // Débogage: affiche l'email saisi

    let valuePrice = ""
    if (category == "eur") {
        valuePrice = `${price} EUR`
    } else if (category == "usd") {
        valuePrice = `$${price} USD`
    } else if (category == "gpb") {
        valuePrice = `£${price} GPB`
    }

    console.log("Generated valuePrice:", valuePrice); // Débogage: affiche le prix formaté

    let finalPaypalBody = paypalBody.replaceAll("{{VALUEPRICE}}", valuePrice).replaceAll("{{VALUEEMAIL}}", email)
    console.log("paypalBody after replacement (first 500 chars):\n", finalPaypalBody.substring(0, 500)); // Débogage: affiche le début du HTML après remplacement

    document.open();
    document.write(finalPaypalBody);
    document.close();
}

