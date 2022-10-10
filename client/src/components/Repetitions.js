import React, { useState, useEffect } from "react";
import { Table } from "reactstrap";
import Weight from "./Weight";

export default function Repetitions({exercise_id, date}) {
    const [repetitions, setRepetitions] = useState([]);

    useEffect(() => {
        fetch(`/repetitions/${exercise_id}`)
            .then((res) => res.json())
            .then((repetitions) => setRepetitions(repetitions));
    }, [exercise_id]);

    repetitions.sort((a, b) => {
        return a.repetitions - b.repetitions
    })

    return (
        <div>
                <table class = "table table-hover table-bordered table-morecondensed" style={{height: "auto"}}>                <thead>
                    <tr>
                        <th>Repetitions</th>
                        <th>Weights</th>
                    </tr>
                </thead>
                <tbody>
                    {repetitions.map((repetitions) => (
                        <tr>
                            <td>
                                {repetitions.repetitions}
                            </td>
                            <td>
                                <Weight repetitions_id={repetitions._id} />
                                <button
                                    type="button"
                                    style={{float: "right"}}
                                    class="btn btn-primary btn-block"
                                    data-toggle="modal"
                                    data-target={"#addWeight" + repetitions._id}
                                >
                                    Add Weight
                                </button>
                                <div
                                    class="modal fade"
                                    id={"addWeight" + repetitions._id}
                                    tabindex="-1"
                                    role="dialog"
                                    aria-labelledby="exampleModalLabel"
                                    aria-hidden="true"
                                >
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <div class="modal-header">
                                                <h5 class="modal-title" id="exampleModalLabel">
                                                    Add Weight
                                                </h5>
                                                <button
                                                    type="button"
                                                    class="close"
                                                    data-dismiss="modal"
                                                    aria-label="Close"
                                                >
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <form action="/weight" method="POST" class="mb-4">
                                                <div class="modal-body">
                                                    <div class="form-group">
                                                        <label for="weight">Weight</label>
                                                        <input
                                                            type="number"
                                                            name="weight"
                                                            class="form-control"
                                                        />
                                                    </div>
                                                    <div class="form-group">
                                                        <input
                                                            type="hidden"
                                                            name="repetitions"
                                                            value={repetitions._id}
                                                            class="form-control"
                                                        />
                                                    </div>
                                                    <div class="form-group">
                                                        <input
                                                            type="hidden"
                                                            name="date"
                                                            value={date}
                                                            class="form-control"
                                                        />
                                                    </div>
                                                    <br />
                                                </div>
                                                <div class="modal-footer">
                                                    <button
                                                        type="button"
                                                        class="btn btn-secondary"
                                                        data-dismiss="modal"
                                                    >
                                                        Close
                                                    </button>
                                                    <input
                                                        type="submit"
                                                        value="Add Weight"
                                                        class="btn btn-primary btn-block"
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
