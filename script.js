const items = document.querySelectorAll(".item");
const cursor = document.querySelector(".cursor-light");

// Click kiye gaye card ko active banata hai aur page ka glow color update karta hai.
function setActiveItem(item) {
    items.forEach((card) => card.classList.toggle("is-active", card === item));
    document.documentElement.style.setProperty("--accent", item.dataset.glow || "#8be9fd");

    // Mobile carousel mein active card ko center ke paas scroll kar deta hai.
    if (window.matchMedia("(max-width: 520px)").matches) {
        item.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
}

// Har card par click aur hover interactions attach kar rahe hain.
items.forEach((item) => {
    item.addEventListener("click", () => {
        // Click par card focus/active hota hai.
        setActiveItem(item);
    });

    item.addEventListener("mouseenter", () => {
        // Hover par cursor bada hota hai, glow color card ke hisaab se change hota hai.
        document.body.classList.add("is-hovering");
        document.documentElement.style.setProperty("--accent", item.dataset.glow || "#8be9fd");
    });

    item.addEventListener("mouseleave", () => {
        // Card se mouse nikalte hi cursor normal size par wapas aata hai.
        document.body.classList.remove("is-hovering");
    });
});

// Mouse/pointer ke saath custom glowing cursor ko move karte hain.
window.addEventListener("pointermove", (event) => {
    if (!cursor) {
        return;
    }

    // Cursor element ko real pointer coordinates par position karta hai.
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
});
