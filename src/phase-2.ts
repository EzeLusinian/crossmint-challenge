import { callApi } from "./callApi";

import { candidateId, dictionary } from "./util";

// For the second exercise, use the "GET" /goal endpoint to obtain the positions and the corresponding data.

// In case it is not a SPACE, I take from a dictionary that creates the corresponding endpoint, and some extra data, such as color or position.

const mainPhase2 = async () => {

    const responseMap = await callApi(
        'GET',
        `/map/${candidateId}/goal`,
    )

    const megaverseMap = responseMap.data.goal

    for (let i = 0; i < megaverseMap.length; i++) {
        for (let j = 0; j < megaverseMap[i].length; j++) {

            const value = megaverseMap[i][j];
            
            if (value !== 'SPACE') {
                
                const { endpoint, ...extra } = dictionary[value]
                
                await callApi(
                    'POST',
                    endpoint,
                    {
                        row: i,
                        column: j,
                        candidateId,
                        ...extra,
                    }
                )
            }

        }
    }

}

mainPhase2()