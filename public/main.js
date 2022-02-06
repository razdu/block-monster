$(function () {
    $.get("/movies")
        .then((movies) => {
            populateMoviesSelection(movies);
            populateMoviesTable(movies);
            $('[data-role="insert"]').show();
            $('[data-role="find"]').hide();
            $('[data-role="update"]').hide();
            $('[data-role="delete"]').hide();
        })
        .catch((e) => console.warn(e));

    $("#movies-list").change(() => {
        if ($("#movies-list option:selected").val() !== "Insert new") {
            $('[data-role="insert"]').hide();
            $('[data-role="update"]').show();
            $('[data-role="delete"]').show();
            let id = $("#movies-list option:selected").val();
            $.get(`/movies/byId/${id}`).then((movie) => {
                fillAllFields(movie);
            });
        } else {
            $('[data-role="insert"]').show();
            $('[data-role="update"]').hide();
            $('[data-role="delete"]').hide();
            emptyFields();
        }
    });

    const populateMoviesSelection = (movies) => {
        $.each(movies, (_, movie) => {
            $("#movies-list").append($("<option>").val(movie._id).html(movie.name));
        });
    };
    const populateMoviesTable = (movies) => {
        $("#movies-table").empty();
        $.each(movies, (_, movie) => {
            let row = $("#movies-table").append(`<tr value=${movie._id}><td>${movie.name}</td><td>${movie.cast.toString()}</td><td>${movie.publishDate.split("-")[0]}</td><td>${movie.originCountry}</td><td>IMDB</td></tr>`);
        });
    };
    const getMovieData = () => {
        return {
            name: $('[name="name"]').val(),
            publishDate: $('[name="publishDate"]').val() || new Date(),
            cast: $('[name="cast"]').val().split(","),
            originCountry: $('[name="originCountry"]').val()
        };
    };

    const fillAllFields = (movie) => {
        $.each(movie, (key, value) => {
            if (key !== "publishDate") {
                $(`[name=${key}`).val(value);
            } else {
                $(`[name=${key}`).val(value.split("T")[0]);
            }
        });
    };

    const emptyFields = () => {
        $.each($(".movieData"), (_, field) => {
            field.value = "";
        });
    };

    $('[data-role="insert"]').click(() => {
        const { name, publishDate, cast, originCountry } = getMovieData();
        $.post("/movies", { name, publishDate, cast, originCountry }, (movie) => emptyFields());
        $.get("/movies").then((movies) => {
            populateMoviesSelection(movies);
            populateMoviesTable(movies);
        });
    });

    $('[data-role="update"]').click(() => {
        let id = $("#movies-list option:selected").val();
        let movieData = getMovieData();
        $.ajax({
            type: "PUT",
            url: `/movies/${id}`,
            data: movieData,
            success: () => {
                $.get("/movies").then((movies) => {
                    populateMoviesTable(movies);
                });
            }
        });
    });

    $('[data-role="delete"]').click(() => {
        let id = $("#movies-list option:selected").val();
        $.ajax({
            type: "DELETE",
            url: `/movies/${id}`,
            success: () => {
                $.get("/movies").then((movies) => {
                    populateMoviesTable(movies);
                });
            }
        });
    });
    $("#movieName").click(() => {
        $.get("/movies/byName").then((movies) => {
            populateMoviesTable(movies);
        });
    });
    $("#published").click(() => {
        $.get("/movies/byDate").then((movies) => {
            populateMoviesTable(movies);
        });
    });
    $("#origin").click(() => {
        $.get("/movies/byOrigin").then((movies) => {
            populateMoviesTable(movies);
        });
    });
});
