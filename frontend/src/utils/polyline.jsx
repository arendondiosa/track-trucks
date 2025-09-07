/* eslint-disable complexity */
import { forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useRef } from 'react';

import { GoogleMapsContext, useMapsLibrary } from '@vis.gl/react-google-maps';

function usePolyline(props) {
  const {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onMouseOver,
    onMouseOut,
    encodedPath,
    ...polylineOptions
  } = props;

  // keep refs for event callbacks
  const callbacks = useRef({});
  Object.assign(callbacks.current, {
    onClick,
    onDrag,
    onDragStart,
    onDragEnd,
    onMouseOver,
    onMouseOut,
  });

  const geometryLibrary = useMapsLibrary('geometry');
  const polyline = useRef(new google.maps.Polyline()).current;

  // update PolylineOptions
  useMemo(() => {
    polyline.setOptions(polylineOptions);
  }, [polylineOptions]);

  const map = useContext(GoogleMapsContext)?.map;

  // decode encodedPath and set
  useMemo(() => {
    if (!encodedPath || !geometryLibrary) return;
    const path = geometryLibrary.encoding.decodePath(encodedPath);
    polyline.setPath(path);
  }, [encodedPath, geometryLibrary]);

  // add/remove polyline to map
  useEffect(() => {
    if (!map) {
      if (map === undefined) console.error('<Polyline> has to be inside a Map component.');
      return;
    }

    polyline.setMap(map);
    return () => {
      polyline.setMap(null);
    };
  }, [map]);

  // attach events
  useEffect(() => {
    if (!polyline) return;

    const gme = google.maps.event;
    [
      ['click', 'onClick'],
      ['drag', 'onDrag'],
      ['dragstart', 'onDragStart'],
      ['dragend', 'onDragEnd'],
      ['mouseover', 'onMouseOver'],
      ['mouseout', 'onMouseOut'],
    ].forEach(([eventName, eventCallback]) => {
      gme.addListener(polyline, eventName, e => {
        const callback = callbacks.current[eventCallback];
        if (callback) callback(e);
      });
    });

    return () => {
      gme.clearInstanceListeners(polyline);
    };
  }, [polyline]);

  return polyline;
}

export const Polyline = forwardRef((props, ref) => {
  const polyline = usePolyline(props);
  useImperativeHandle(ref, () => polyline, []);
  return null;
});
