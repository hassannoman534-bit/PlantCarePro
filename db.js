/**
 * PlantCarePro - Simulated Client-Side Database Engine
 * Powered by LocalStorage State Management
 */

const PC_DB = {
    seed: {
        products: [
            { id: 1, name: "Golden Pothos (Money Plant)", price: 450, nursery: "Model Town Nursery", location: "lahore", type: "indoor", img: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?q=80&w=400" },
            { id: 2, name: "Mothia (Arabian Jasmine)", price: 350, nursery: "Gulberg Flora Hub", location: "lahore", type: "sunlight", img: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?q=80&w=400" },
            { id: 3, name: "Laurentii Snake Plant", price: 1200, nursery: "Patoki Mega Farm", location: "lahore", type: "low-maintenance", img: "https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=400" },
            { id: 4, name: "Peace Lily Premium", price: 950, nursery: "DHA Green Center", location: "lahore", type: "indoor", img: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?q=80&w=400" },
            { id: 5, name: "Zanzibar Gem (ZZ Plant)", price: 1600, nursery: "Model Town Nursery", location: "lahore", type: "low-maintenance", img: "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?q=80&w=400" },
            { id: 6, name: "Red Ixora Bush", price: 600, nursery: "Gulberg Flora Hub", location: "lahore", type: "sunlight", img: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=400" }
        ],
        libraries: [
            { id: "pothos", name: "Money Plant Calibration", tags: ["#IndoorPlants", "#LahoreGardening"], summary: "Prevent root rot and scale drop during peak summer heat in central Punjab regions.", desc: "Keep in indirect light. Water only when the top 2 inches of soil are dry to prevent root fungal issues common in Lahore's monsoons." },
            { id: "jasmine", name: "Jasmine Bloom Secrets", tags: ["#SummerWatering", "#LahoreGardening"], summary: "Optimizing soil nutrient values and nitrogen concentrations to stimulate heavy seasonal blooming.", desc: "Requires at least 6 hours of direct Pakistani solar index exposure. Fertilize with high-phosphorus organic material every 15 days." },
            { id: "snake", name: "Snake Plant Care", tags: ["#IndoorPlants", "#LowMaintenance"], summary: "Master watering metrics during the indoor monsoon humidity spikes across urban households.", desc: "Extremely resilient. Tolerates low lighting matrix. Overwatering is the single structural cause of failure; allow soil matrix dehydration between cycles." }
        ]
    },

    init() {
        if (!localStorage.getItem("pc_products")) {
            localStorage.setItem("pc_products", JSON.stringify(this.seed.products));
        }
        if (!localStorage.getItem("pc_libraries")) {
            localStorage.setItem("pc_libraries", JSON.stringify(this.seed.libraries));
        }
        if (!localStorage.getItem("pc_bookings")) localStorage.setItem("pc_bookings", JSON.stringify([]));
        if (!localStorage.getItem("pc_partners")) localStorage.setItem("pc_partners", JSON.stringify([]));
        if (!localStorage.getItem("pc_cart")) localStorage.setItem("pc_cart", JSON.stringify([]));
    },

    getTable(key) {
        return JSON.parse(localStorage.getItem(`pc_${key}`)) || [];
    },

    saveTable(key, data) {
        localStorage.setItem(`pc_${key}`, JSON.stringify(data));
        window.dispatchEvent(new Event("storage_update"));
    },

    insert(key, row) {
        const data = this.getTable(key);
        row.id = Date.now();
        data.push(row);
        this.saveTable(key, data);
        return row;
    },

    getCartCount() {
        const cart = this.getTable("cart");
        return cart.reduce((acc, curr) => acc + curr.quantity, 0);
    },

    addToCart(productId) {
        const cart = this.getTable("cart");
        const products = this.getTable("products");
        const product = products.find(p => p.id === productId);
        
        if (!product) return;
        
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        this.saveTable("cart", cart);
    }
};

PC_DB.init();

// Global Dynamic Cart Badge Update Runtime Logic
document.addEventListener("DOMContentLoaded", () => {
    const updateBadges = () => {
        const badges = document.querySelectorAll(".cart-badge");
        const count = PC_DB.getCartCount();
        badges.forEach(badge => {
            badge.textContent = count;
            badge.style.display = count > 0 ? "flex" : "none";
        });
    };
    updateBadges();
    window.addEventListener("storage_update", updateBadges);
});