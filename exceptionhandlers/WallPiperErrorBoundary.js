import React from 'react';
import { Dimensions } from 'react-native';
import { FallBackComponent } from '../components/FallBackComponent';
import { componentErrorConsts, errorMessages } from '../constants/Constants';

export default class WallPiperErrorBoundary extends React.PureComponent {

    state = {
        error: false
    }

    static getDerivedStateFromError(error) {
        return { error: true };
    }

    componentDidCatch(error, errorInfo) {
        // deal with errorInfo if needed
    }

    render() {
        const { width, height } = Dimensions.get("window");

        if (this.state.error) {
            return <FallBackComponent width={width} height={height} descriptionText={errorMessages.ERROR_BOUNDARY}
                componentErrorConst={componentErrorConsts.ERROR_BOUNDARY} />;
        }
        return this.props.children;
    }
}
