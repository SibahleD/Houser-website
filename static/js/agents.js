// Fetch and display all agents
document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/agents')
        .then(response => response.json())
        .then(agents => {
            const agentsList = document.querySelector('.agents-list');
            agentsList.innerHTML = ''; // Clear existing content

            agents.forEach(agent => {
                const agentCard = `
                    <div class="agent-card">
                        <div class="agent-image">
                            <img src="${agent.image_url || 'https://placehold.co/300x250'}" alt="${agent.name}">
                        </div>
                        <div class="agent-content">
                            <h4>${agent.name}</h4>
                            <p>Specialist in ${agent.specialization}</p>
                            <p>Email: ${agent.email}</p>
                            <p>Phone: ${agent.phone}</p>
                        </div>
                        <a href="agent-details.html?id=${agent.id}">
                            <button>Contact</button>
                        </a>
                    </div>
                `;
                agentsList.insertAdjacentHTML('beforeend', agentCard);
            });
        })
        .catch(error => console.error('Error fetching agents:', error));
});