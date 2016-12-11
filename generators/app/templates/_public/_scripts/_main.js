define(['socketio', 'd3'], function(io, d3){
    var socket = io.connect('/<%= name %>');

    var personById = Object.create(null);

    socket.on('joined-channel', function(response){
        for ( var id in response.positions ) {
            personById[id] = {id: id, position: response.positions[id]};
        }
        updateView();
    });

    socket.on('person-joined', function(person){
        personById[person.id] = person;
        updateView();
    });

    socket.on('person-left', function(person){
        delete personById[person.id];
        updateView();
    });

    var svg = d3.select('body')
        .append('svg')
        .attr('width', 800)
        .attr('height', 600);

    function updateView() {
        var currentPersons = [];
        for (var id in personById) {
            currentPersons.push(personById[id]);
        }

        var updateSvg = svg
            .selectAll('.person')
            .data(currentPersons);

        updateSvg
            .enter()
            .append('circle')
            .classed('person', true)
            .merge(updateSvg)
            .attr('cx', function(d){return d.position.x;})
            .attr('cy', function(d){return d.position.y;})
            .attr('r', function(d){return 10;});
    }

});