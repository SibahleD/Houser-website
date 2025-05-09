// Fetch and display all properties
document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/properties')
        .then(response => response.json())
        .then(properties => {
            const propertyList = document.querySelector('.property-list');
            propertyList.innerHTML = ''; // Clear existing content

            properties.forEach(property => {
                const propertyCard = `
                    <div class="property-card">
                        <img src="${property.image_url || 'https://placehold.co/600x400'}" alt="${property.title}">
                        <div class="property-info">
                            <div class="property-header">
                                <h2>${property.title}</h2>
                                <button onclick="viewPropertyDetails(${property.id})">View Details</button>
                            </div>
                            <p>📍 ${property.location} | ${property.bedrooms} Bed | ${property.bathrooms} Bath</p>
                            <p>Amenities: ${property.amenities}</p>
                            <p class="price">$${property.price.toLocaleString()}</p>
                        </div>
                    </div>
                `;
                propertyList.insertAdjacentHTML('beforeend', propertyCard);
            });
        })
        .catch(error => console.error('Error fetching properties:', error));
});

// View single property details
function viewPropertyDetails(propertyId) {
    window.location.href = `listings.html?id=${propertyId}`;
}