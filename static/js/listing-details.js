// Fetch and display single property details
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id');

    if (propertyId) {
        fetch(`/api/properties/${propertyId}`)
            .then(response => response.json())
            .then(property => {
                // Update property details
                document.querySelector('.listing-title').textContent = property.title;
                document.querySelector('.listing-header h2').innerHTML = `Located in <span>${property.location}</span>`;
                document.querySelector('.price').textContent = `$${property.price.toLocaleString()}`;
                document.querySelector('.listing-beds p').textContent = `${property.bedrooms} Bed`;
                document.querySelector('.listing-bath p').textContent = `${property.bathrooms} Bath`;
                document.querySelector('.listing-sqft p').textContent = `${property.sqft} sqft`;
                document.querySelector('.about-container p').textContent = property.description;
                document.querySelector('.amenities p').textContent = property.amenities;

                // Fetch agent details
                return fetch(`/api/agents/${property.agent_id}`);
            })
            .then(response => response.json())
            .then(agent => {
                const agentCard = document.querySelector('.agent-card');
                agentCard.querySelector('img').src = agent.image_url || 'https://placehold.co/100';
                agentCard.querySelector('strong').textContent = agent.name;
            })
            .catch(error => console.error('Error fetching property details:', error));
    }
});