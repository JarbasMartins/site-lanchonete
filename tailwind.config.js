/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./***.{html,js}"],
    theme: {
        extend: {
            backgroundImage: {
                home: "url(/assets/background-homeLANCH.jpg)",
                local: "url(/assets/local2.jpg)",
            },
        },
    },
    plugins: [],
};
