import React from 'react';
import PropTypes from 'prop-types';
import { YMaps, Map, FullscreenControl, TypeSelector, ZoomControl, Placemark, Clusterer } from 'react-yandex-maps';

export function YandexMapsBlock({ width, height, typeSelectorProps, location, showPlacemark, clustererPoints }) {
    const [optionsState, setOptionsState] = React.useState({
        zoom: 8,
        center: location && Object.values(location),
        showPlacemark,
    });
    return (
        <YMaps>
            <div>
                <Map
                    // defaultState={{ center: location && Object.values(location), zoom: 5 }}
                    state={optionsState}
                    width={width}
                    height={height}
                >
                    <FullscreenControl />
                    <TypeSelector {...typeSelectorProps} />
                    <ZoomControl />
                    {/* {optionsState.showPlacemark && <Placemark geometry={optionsState.center} />} */}
                    {clustererPoints && (
                        <Clusterer
                            options={{
                                preset: 'islands#invertedDarkBlueClusterIcons',
                                groupByCoordinates: false,
                            }}
                        >
                            {clustererPoints.map((it, index) => (
                                <Placemark key={index} geometry={it} />
                            ))}
                        </Clusterer>
                    )}
                </Map>
            </div>
        </YMaps>
    );
}

YandexMapsBlock.defaultProps = {
    width: '100%',
    height: '400px',
    typeSelectorProps: {
        options: { float: 'left' },
    },
    location: { lat: 55.75, lng: 37.57 },
    showPlacemark: true,
};

YandexMapsBlock.propTypes = {
    location: PropTypes.object,
    width: PropTypes.string,
    height: PropTypes.string,
    typeSelectorProps: PropTypes.object,
    showPlacemark: PropTypes.bool,
    yandexApiResponse: PropTypes.object,
    clustererPoints: PropTypes.array,
};
