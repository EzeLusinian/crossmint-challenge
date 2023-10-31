import { callApi } from "./callApi";

import { candidateId } from './util'

// For this first exercise, I approached it with the idea of replicating what it asked for. 
// Make an "X" shape no matter the size (in this case I put 11) and with a "border" no matter the size (in this case I put 2).

const mainPhase1 = async () => {

    const size = 11;
    const border = 2

    // with two for i go through all possible spaces
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {

            // if this if condition is fulfilled, it means that it is on a point that can belong to any of the two diagonals of the "X".
            if ((i === j || size - 1 - i === j) && (i > border - 1 && j > border - 1 && i < size - border && j < size - border)) {
                await callApi(
                    'POST',
                    '/polyanets',
                    {
                        row: i,
                        column: j,
                        candidateId,
                    }
                )
            }

        }
    }

}

mainPhase1()