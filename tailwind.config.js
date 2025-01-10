/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./***.{html,js}"],
    theme: {
        extend: {
            backgroundImage: {
                home: "url(/assets/papeldeparedeinfo.png)",
                local: "url(/assets/local2.jpg)",
            },
        },
    },
    plugins: [],
};
