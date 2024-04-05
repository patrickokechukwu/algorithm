function dijkstra(graph, start) {
    // Initialize distances object with starting vertex set to 0 and all other vertices set to Infinity
    let distances = {};
    for (let vertex in graph) {
        distances[vertex] = Infinity;
    }
    distances[start] = 0;

    // Initialize priority queue to keep track of vertices with their corresponding distances
    let queue = [];
    for (let vertex in distances) {
        queue.push({ vertex, distance: distances[vertex] });
    }

    // Main loop of Dijkstra's algorithm
    while (queue.length > 0) {
        // Sort the queue based on distances
        queue.sort((a, b) => a.distance - b.distance);

        // Extract the vertex with the smallest distance
        let shortest = queue.shift();
        let currentVertex = shortest.vertex;

        // Iterate through neighbors of the current vertex
        for (let neighbor in graph[currentVertex]) {
            // Calculate the new distance from start to neighbor via currentVertex
            let distanceToNeighbor = distances[currentVertex] + graph[currentVertex][neighbor];

            // If the new distance is shorter than the current distance to neighbor, update distances
            if (distanceToNeighbor < distances[neighbor]) {
                distances[neighbor] = distanceToNeighbor;

                // Update the distance of neighbor in the queue
                for (let i = 0; i < queue.length; i++) {
                    if (queue[i].vertex === neighbor) {
                        queue[i].distance = distanceToNeighbor;
                        break;
                    }
                }
            }
        }
    }

    // Return the shortest distances object
    return distances;
}

// Example usage:
const graph = {
    'A': { 'B': 4, 'C': 2 },
    'B': { 'A': 4, 'C': 5, 'D': 10 },
    'C': { 'A': 2, 'B': 5, 'D': 3 },
    'D': { 'B': 10, 'C': 3 }
};

console.log(dijkstra(graph, 'A')); // Output: { 'A': 0, 'B': 4, 'C': 2, 'D': 5 }