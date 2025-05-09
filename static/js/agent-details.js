// Fetch and display single agent details
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const agentId = urlParams.get('id');

    if (agentId) {
        fetch(`/api/agents/${agentId}`)
            .then(response => response.json())
            .then(agent => {
                // Update agent profile
                document.querySelector('.agent-profile img').src = agent.image_url || 'https://placehold.co/300x250';
                document.querySelector('.profile-details h2').textContent = agent.name;
                document.querySelector('.agent-bio p:nth-of-type(1)').innerHTML = `<strong>Specialization:</strong> ${agent.specialization}`;
                document.querySelector('.agent-bio p:nth-of-type(2)').innerHTML = `<strong>Email:</strong> ${agent.email}`;
                document.querySelector('.agent-bio p:nth-of-type(3)').innerHTML = `<strong>Phone:</strong> ${agent.phone}`;
                document.querySelector('.agent-bio p:nth-of-type(4)').innerHTML = `<strong>Experience:</strong> ${agent.experience} years`;
                document.querySelector('.agent-bio p:nth-of-type(5)').innerHTML = `<strong>Location:</strong> ${agent.location || 'Nairobi'}`;
                document.querySelector('.agent-bio span:nth-of-type(1)').textContent = `${agent.experience}+ Years Experience`;
                document.querySelector('.agent-bio span:nth-of-type(2)').textContent = `${agent.properties_sold || '50+'}+ Properties Sold`;

                // Fetch agent's properties
                return fetch(`/api/agents/${agentId}/properties`);
            })
            .then(response => response.json())
            .then(properties => {
                const propertiesSection = document.createElement('section');
                propertiesSection.className = 'agent-properties';
                propertiesSection.innerHTML = `<h2>Properties Listed by This Agent</h2><div class="property-list"></div>`;

                document.querySelector('main').appendChild(propertiesSection);
                const propertyList = document.querySelector('.agent-properties .property-list');

                properties.forEach(property => {
                    const propertyCard = `
                        <div class="property-card">
                            <img src="${property.image_url || 'https://placehold.co/600x400'}" alt="${property.title}">
                            <div class="property-info">
                                <h3>${property.title}</h3>
                                <p>📍 ${property.location} | ${property.bedrooms} Bed | ${property.bathrooms} Bath</p>
                                <p class="price">$${property.price.toLocaleString()}</p>
                                <button onclick="window.location.href='listings.html?id=${property.id}'">View Details</button>
                            </div>
                        </div>
                    `;
                    propertyList.insertAdjacentHTML('beforeend', propertyCard);
                });
            })
            .catch(error => console.error('Error fetching agent details:', error));
    }
});