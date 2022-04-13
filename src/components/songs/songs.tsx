import React, {
    FunctionComponent, useState, useEffect,
} from 'react';
import {
    Grid, OutlinedInput, Typography, makeStyles, FormControl,
} from '@material-ui/core';
import { useDebounce } from 'hooks/useBounce';
import { fetchSongs } from 'services/apiService';

const useStyles: any = makeStyles((theme) => ({
    root: {
        width: '100%',
        display: 'flex',
        padding: '20px',
    },
    searchContainer: {
    },
    inputfield: {
        color: `${theme.palette.primary.main}`,
        margin: `${theme.spacing(2)}px 0px`,
        alignSelf: 'center',
        '& legend > span': {
            fontSize: '0.8rem',
        },
        borderRadius: '12px',
        '& .MuiInputBase-root': {
            height: 68,
            borderRadius: 12,
        },
        '& .MuiInputBase-root:hover': {
            borderColor: '#5b5b5b',
        },
    },
    listView: {
        backgroundColor: '#bcbcbc',
    },
}));

const Songs: FunctionComponent = () => {
    const {
        root,
        searchContainer,
        inputfield,
        listView,
    } = useStyles();
    const [searchText, setSearchText] = useState<string>('');
    const [elementsAfterShift, setElementsAfterShift] = useState<string[]>([]);
    const elements = ['A', 'B', 'C', 'D', 'E'];
    const [sortedAlbums, setSortedAlbums] = useState<string[]>([]);
    const [results, setResults] = useState<string[]>(elements);
    let startIdx = 0; let
        counter = 0;
    let clonedElementsAfterShift: string[] = [];
    const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };
    const debouncedSearchText = useDebounce(searchText, 500);

    useEffect(() => {
        const interval = setInterval(handleElementShift, 1000);
        return () => clearInterval(interval);
    }, []);

    const shiftElement = () => {
        const shiftedEl = results.shift();
        setElementsAfterShift(elementsAfterShift.splice(0, elementsAfterShift.length, ...results));
        const afterShift = results;
        afterShift.push(shiftedEl as string);
        setResults(results.splice(0, results.length, ...afterShift));
    };

    const shiftAlbum = () => {
        if (counter === 0) {
            clonedElementsAfterShift = [...elementsAfterShift];
        }
        if (clonedElementsAfterShift.length > 0) {
            const albumToDisplay = [...sortedAlbums].splice(startIdx, 5 - clonedElementsAfterShift.length);
            const joinedList = [...clonedElementsAfterShift, ...albumToDisplay];
            clonedElementsAfterShift.shift();
            setResults(joinedList);
        } else {
            startIdx += 1;
            const anything = [...sortedAlbums].splice(startIdx - 1, 5);
            setResults(anything);
        }
        counter += 1;
    };

    const handleElementShift = () => {
        if (!searchText && sortedAlbums.length < 1) { shiftElement(); } else {
            shiftAlbum();
        }
    };

    useEffect(() => {
        if (debouncedSearchText) {
            (async () => {
                try {
                    const { data } = await fetchSongs(debouncedSearchText);
                    const albumResult: string[] = data?.results?.map((result: any) => result.collectionName);
                    if (albumResult?.length) {
                        albumResult.sort();
                        setSortedAlbums(sortedAlbums.splice(0, sortedAlbums.length, ...albumResult));
                    }
                } catch (e: any) {
                    console.error(`Could not fetch songs - stack: ${(e as Error).stack}`);
                }
            })();
        }
    }, [debouncedSearchText]);

    const mapList = (element: string, idx: number) => (
        <Grid key={idx + 1} data-testid="elements">
            <Grid style={{
                border: '1px solid black',
                borderRadius: 5,
                backgroundColor: 'white',
                margin: '20px',
                display: 'flex',
                justifyContent: 'center',
            }}
            >
                <Typography> {element} </Typography>
            </Grid>
        </Grid>
    );

    return (
        <Grid item xs={12} md={6} container className={root} data-testid="songs-component">
            <Grid item xs={12} className={searchContainer}>
                <FormControl className={inputfield} fullWidth>
                    <OutlinedInput
                        id="searchInput"
                        value={searchText}
                        style={{ fontSize: '16px' }}
                        placeholder="Search Band"
                        onChange={onSearchInputChange}
                        fullWidth
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} className={listView}>
                <Grid item xs={12}>
                    {
                        results && results?.map(mapList)
                    }
                </Grid>
            </Grid>
        </Grid>
    );
};
export default Songs;
