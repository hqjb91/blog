import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSpring, animated } from "react-spring";
import Link from 'next/link';

const trans = (x: number, y: number, s: number) =>
  `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

const calc = (x: number, y: number) => {
  const damper = 20;
  return [-(y / damper), x / damper, 0.9];
};

const BlogCard = ({title, subtitle, content, link}: any) => {

    const [props, set] = useSpring(() => ({
        xys: [0, 0, 1],
        config: { mass: 5, tension: 350, friction: 40 }
      }));

    return (
    <animated.div
        onMouseMove={event => {
          const { clientX, clientY } = event;
          const { left, top } = event.currentTarget.getBoundingClientRect();

          return set({ xys: calc(clientX-left, clientY-top) });
        }}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        style={{ transform: props.xys.interpolate(trans) }}
    >
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h5" component="div">
                    {title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {subtitle}
                </Typography>
                <Typography variant="body2">
                    {content}
                </Typography>
            </CardContent>
            <CardActions>
                <Link href={link ?? "/"}>
                    <Button size="small">
                        Learn More
                    </Button>
                </Link>
            </CardActions>
        </Card>
    </animated.div>
    )
};

export default BlogCard;