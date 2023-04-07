import { Profile } from "@liff/get-profile";
import liff from "@line/liff/dist/lib";
import LoginIcon from "@mui/icons-material/Login";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Welcome, getProfile, logoutProfile } from "../../api/hn";
import Praram9Logo from "../../assets/Praram9Logo.png";

const initProfile: Profile = {
  userId: "",
  displayName: "",
  pictureUrl: "",
};

const initWecome: Welcome = {
  hn_no: "",
  userId: "",
  profile: {
    hn: "",
    titleTH: "",
    firstNameTH: "",
    lastNameTH: "",
    titleEN: " ",
    firstNameEN: "",
    lastNameEN: "",
    gender: "",
    birthDate: new Date(),
    mobilePhone: "",
    email: "",
    nationality: "",
    religion: "",
  },
};
function Profile() {
  const [profile, setProfile] = useState(initProfile);
  const [user, setUser] = useState(initWecome);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    liff
      .init({
        liffId: "1660839837-qmMLVLaA", // Use own liffId
      })
      .then(callbackProfile);
  }, []);

  const callbackProfile = async () => {
    if (!liff.isInClient() && !liff.isLoggedIn()) {
      liff.login();
    } else {
      liff.getProfile().then(async (p) => {
        setProfile(p);
        const user = await getProfile(p.userId);
        setUser(user);
      });
    }
    // const user = await getProfile("Ub2d19f02162215c6af4806dabe23f5b4");
    // setUser(user);
  };

  const handleClick = useCallback(async () => {
    try {
      setLoading(true);
      await logoutProfile(profile.userId);
      Swal.fire({
        title: "ออกจากระบบสำเร็จ",
        icon: "success",
        confirmButtonText: "ปิด",
      }).then(() => {
        liff.closeWindow();
        setLoading(false);
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [profile]);
  return (
    <Container>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ marginTop: 5 }}
      >
        <Grid item lg={4} md={5} xs={12}>
          <Card>
            <CardHeader
              avatar={
                <Avatar
                  src={profile.pictureUrl}
                  sx={{ bgcolor: blue[500] }}
                  aria-label="recipe"
                ></Avatar>
              }
              title={`ยินดีต้อนรับ ${profile.displayName}`}
            />
            <CardMedia component="img" src={Praram9Logo} alt="logo" />
            <CardContent>
              <Grid
                container
                justifyContent="center"
                alignItems="center"
                rowSpacing={2}
              >
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color={"HighlightText"}>
                    {"เลขที่ HN"}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="subtitle2" color={"GrayText"}>
                    {user.profile.hn}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color={"HighlightText"}>
                    {"ชื่อ:"}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="subtitle2" color={"GrayText"}>
                    {user.profile.titleTH ?? ""}{" "}
                    {user.profile.firstNameTH ?? ""}{" "}
                    {user.profile.lastNameTH ?? ""}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color={"HighlightText"}>
                    {"ชื่อ(อังกฤษ):"}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="subtitle2" color={"GrayText"}>
                    {user.profile.titleEN ?? ""}{" "}
                    {user.profile.firstNameEN ?? ""}{" "}
                    {user.profile.lastNameEN ?? ""}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color={"HighlightText"}>
                    {"เพศ:"}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="subtitle2" color={"GrayText"}>
                    {user.profile.gender === "Y" ? "หญิง" : "ชาย"}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color={"HighlightText"}>
                    {"วันเกิด:"}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="subtitle2" color={"GrayText"}>
                    {moment(user.profile.birthDate).format("DD/MM/YYYY")}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color={"HighlightText"}>
                    {"เบอร์ติดต่อ:"}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="subtitle2" color={"GrayText"}>
                    {user.profile.mobilePhone}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle2" color={"HighlightText"}>
                    {"อีเมล:"}
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="subtitle2" color={"GrayText"}>
                    {user.profile.email}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                loading={loading}
                loadingPosition="start"
                onClick={handleClick}
                endIcon={<LoginIcon />}
              >
                ออกจากระบบ
              </LoadingButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Profile;
