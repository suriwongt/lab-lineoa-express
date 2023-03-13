import { Avatar, Grid } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import liff from '@line/liff';
import { Profile } from '@liff/get-profile';

const initProfile: Profile = {
    userId: '',
    displayName: '',
    pictureUrl: '',
}
function Home() {

    const [profile, setProfile] = useState(initProfile)

    useEffect(() => {
        liff.init({
            liffId: '1656511282-aGrdEx3K', // Use own liffId
        }).then(callbackProfile);
    }, [])


    const callbackProfile = async () => {

        if (!liff.isInClient() && !liff.isLoggedIn()) {
            liff.login()
        } else {
            const l_profile = await liff.getProfile()
            setProfile(l_profile)
        }
    }

    return (<Container>
        <Grid container justifyContent={'center'}>
            <Grid item md={5} xs={12}>
                <Avatar src={profile.pictureUrl} />
            </Grid>
            <Grid item md={5} xs={12}>{profile.displayName}</Grid>
        </Grid>
    </Container>);
}

export default Home;