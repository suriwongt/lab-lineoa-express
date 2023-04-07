import { Profile } from "@liff/get-profile";
import liff from "@line/liff";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  InputLabel,
  Stack,
  TextField,
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { Container } from "@mui/system";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import * as yup from "yup";
import { postProfile } from "../../api/hn";
import Praram9Logo from "../../assets/Praram9Logo.png";

const initProfile: Profile = {
  userId: "",
  displayName: "",
  pictureUrl: "",
};

function Home() {
  const [profile, setProfile] = useState(initProfile);
  const [loading, setLoading] = useState(false);
  const schema = yup
    .object<any>({
      hn_no: yup
        .string()
        .min(6, "กรุณาระบุ HN ให้ถูกต้อง")
        .required("กรุณาระบุเลข HN"),
    })
    .required();

  useEffect(() => {
    liff
      .init({
        liffId: "1660839837-nvNZaZyD", // Use own liffId
      })
      .then(callbackProfile);
  }, []);

  const callbackProfile = async () => {
    if (!liff.isInClient() && !liff.isLoggedIn()) {
      liff.login();
    } else {
      liff.getProfile().then((p) => setProfile(p));
    }
  };

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      hn_no: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const data = {
          hn_no: values.hn_no,
          ...profile,
        };
        await postProfile(data);

        Swal.fire({
          title: "ลงทะเบียนสำเร็จ",
          icon: "success",
          confirmButtonText: "ปิด",
        }).then(() => {
          liff.closeWindow();
          setLoading(false);
        });
      } catch (error) {
        setLoading(false);
        Swal.fire({
          title: "ไม่พบข้อมูล",
          icon: "error",
          confirmButtonText: "ปิด",
        });
      }
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: "80vh" }}
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
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Stack>
                      <InputLabel
                        error={
                          formik.touched["hn_no"] &&
                          Boolean(formik.errors["hn_no"])
                        }
                        required
                      >
                        กรอกเลขที่ HN
                      </InputLabel>
                      <TextField
                        id={"hn_no"}
                        name={"hn_no"}
                        value={formik.values["hn_no"]}
                        type={"text"}
                        error={
                          formik.touched["hn_no"] &&
                          Boolean(formik.errors["hn_no"])
                        }
                        helperText={
                          formik.touched["hn_no"] && formik.errors["hn_no"]
                        }
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                    </Stack>
                  </Grid>
                  {profile.userId && (
                    <Grid item xs={12}>
                      <LoadingButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        loading={loading}
                        loadingPosition="start"
                      >
                        ลงทะเบียน
                      </LoadingButton>
                    </Grid>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Home;
