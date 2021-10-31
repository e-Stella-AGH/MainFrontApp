import {createTheme} from "@material-ui/core/styles";

export const theme = createTheme({
    status: {
        danger: {
            main: '#d32f2f'
        },
        success: {
            main: '#388e3c'
        }
    },
    palette: {
        primary: {
            main: '#4c4fae'
        },
        secondary: {
            main: '#54C1FB'
        },
        background: {
            main: '#ffffff',
            dark: '#272848'
        },
        card: {
            main: '#d7d7d7',
            light: '#e5e5e5',
            dark: '#d3d3d3',
            background: '#ffffff'
        },
        focused: {
            light: '#8ff4ff',
            main: '#54C1FB',
            dark: '#0091c8'
        }
    }
})