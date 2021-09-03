import {Box, Card, CardContent, Divider, Typography, useTheme} from "@material-ui/core";
import {SkillIndicator} from "./SkillIndicator";

export const OfferSkill = ({ name, skillLevel }) => {

    const enumerateSkillLevel = () => {
        switch (skillLevel) {
            case 'NICE_TO_HAVE': return 1
            case 'JUNIOR': return 2
            case 'REGULAR': return 3
            case 'ADVANCED': return 4
            default: return 5
        }
    }

    const theme = useTheme()

    const getDotsOnSkillLevel = () => {
        const skills = []
        const enumerated = enumerateSkillLevel()
        for(let i=0; i<5; i++){
            skills.push(<div style={{float: "left"}} key={i}><SkillIndicator isFilled={ i < enumerated} /></div>)
        }
        return skills
    }

    return (
        <Box m={2}>
            <Card style={{backgroundColor: theme.palette.card.main}}>
                <CardContent>
                    <Box m={1} id="indicators" style={{display: "flex"}}>
                        {getDotsOnSkillLevel()}
                    </Box>
                    <Box m={1}>
                        <Typography>
                            {name}
                        </Typography>
                    </Box>
                    <Divider />
                    <Box m={1}>
                        <Typography color="textSecondary">
                            {skillLevel}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
}