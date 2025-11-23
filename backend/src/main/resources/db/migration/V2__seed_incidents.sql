TRUNCATE TABLE incident RESTART IDENTITY CASCADE;

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('APPROVED', 'Norway', 'Near-miss', 'CLIFF', 'TRACK', 'DELAY', 10, 'Clear, light winds', '2025-02-03', 'Low exit with conservative delay and clean deployment.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('APPROVED', 'Switzerland', 'Incident', 'CLIFF', 'WINGSUIT', 'DELAY', 12, 'High clouds, light tailwind', '2025-03-12', 'Wingsuit cliff jump with off-heading opening corrected with strong input.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('APPROVED', 'Italy', 'Injury', 'BUILDING', 'STATIC', 'STATIC_LINE', 0, 'Calm, cool evening', '2025-01-19', 'Static-line building jump with awkward landing and minor ankle injury.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('APPROVED', 'USA', 'Near-miss', 'BRIDGE', 'TRACK', 'DELAY', 8, 'Overcast, moderate winds', '2025-04-02', 'Bridge jump with low pull and brisk canopy turn away from obstacles.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('APPROVED', 'France', 'Off-heading', 'CLIFF', 'TRACK', 'DELAY', 9, 'Sunny, crosswind at exit', '2025-02-21', 'Off-heading opening toward wall managed with aggressive riser input and course correction.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('APPROVED', 'Spain', 'Near-miss', 'ANTENNA', 'STATIC', 'PCA', 0, 'Mild winds, dusk', '2025-03-05', 'PCA antenna jump with line twist resolved before impact risk developed.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('APPROVED', 'USA', 'Incident', 'BRIDGE', 'STATIC', 'STATIC_LINE', 0, 'Cold, low clouds', '2025-01-28', 'Static-line bridge jump with off-heading toward structure and quick correction.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('APPROVED', 'Norway', 'Near-miss', 'CLIFF', 'TRACK', 'DELAY', 11, 'High cloud base, light wind', '2025-05-10', 'Track jump with unstable exit and delayed pitch leading to low but survivable opening.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('APPROVED', 'Switzerland', 'Line twists', 'CLIFF', 'WINGSUIT', 'DELAY', 14, 'Stable high pressure, calm', '2025-06-02', 'Wingsuit jump with line twists cleared quickly with altitude to spare.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('APPROVED', 'USA', 'Water landing', 'BRIDGE', 'STATIC', 'PCA', 0, 'Warm, light wind downriver', '2025-07-18', 'PCA bridge jump ending in intentional water landing after line twist concern.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('APPROVED', 'Italy', 'Equipment issue', 'BUILDING', 'TRACK', 'DELAY', 7, 'Humid, gentle breeze', '2025-03-30', 'Track jump with staging hang-up that cleared after brief hesitation at line stretch.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('APPROVED', 'Norway', 'Near-miss', 'CLIFF', 'TRACK', 'DELAY', 9, 'Cool and clear', '2025-04-25', 'Low exit with brisk track and short delay that still produced comfortable separation.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('APPROVED', 'France', 'Incident', 'BRIDGE', 'STATIC', 'STATIC_LINE', 0, 'Light rain, variable winds', '2025-02-10', 'Static bridge jump with canopy surge leading to hard landing and bruising.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('APPROVED', 'Switzerland', 'Near-miss', 'CLIFF', 'WINGSUIT', 'DELAY', 13, 'Cold, upslope wind', '2025-01-22', 'Early wingsuit season jump with slightly off exit timing and conservative flight path.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('APPROVED', 'USA', 'Off-heading', 'ANTENNA', 'STATIC', 'PCA', 0, 'Clear night, light wind', '2025-05-01', 'Night PCA antenna jump with off-heading corrected with deep toggle input near ground.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('APPROVED', 'Spain', 'Near-miss', 'BRIDGE', 'TRACK', 'DELAY', 8, 'Hot, light tailwind', '2025-06-20', 'Bridge track jump with late flare and landing close to obstacle line.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('APPROVED', 'Norway', 'Incident', 'CLIFF', 'TRACK', 'DELAY', 10, 'Overcast, strong valley wind', '2025-07-05', 'Track jump with turbulence-induced canopy surge and partial collapse on approach.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('APPROVED', 'USA', 'Injury', 'BRIDGE', 'STATIC', 'STATIC_LINE', 0, 'Cool, gusty crosswind', '2025-05-16', 'Static bridge jump with uneven landing surface and minor knee injury.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('APPROVED', 'France', 'Near-miss', 'CLIFF', 'WINGSUIT', 'DELAY', 12, 'Blue sky, moderate wind', '2025-08-11', 'Wingsuit line with tighter than planned proximity due to slightly deeper start.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('APPROVED', 'Italy', 'Off-heading', 'BUILDING', 'TRACK', 'DELAY', 6, 'Night, calm', '2025-04-14', 'Night building jump with 90-degree off-heading solved quickly but reducing margin.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('SUBMITTED', 'USA', 'Near-miss', 'BRIDGE', 'STATIC', 'PCA', 0, 'Warm, light upriver wind', '2025-09-01', 'Low PCA with canopy pressurizing just before impact would have become unavoidable.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('SUBMITTED', 'Norway', 'Incident', 'CLIFF', 'TRACK', 'DELAY', 9, 'Cloudy, building wind', '2025-09-12', 'Track jump with slightly unstable body position and harder than planned landing.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('SUBMITTED', 'Switzerland', 'Near-miss', 'CLIFF', 'WINGSUIT', 'DELAY', 13, 'High cloud, light breeze', '2025-08-25', 'Wingsuit opening closer to wall than expected after shallower line choice.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('SUBMITTED', 'Spain', 'Near-miss', 'ANTENNA', 'STATIC', 'STATIC_LINE', 0, 'Warm, low wind', '2025-07-30', 'Static antenna jump with bridle routing concern leading to conservative exit.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('SUBMITTED', 'USA', 'Equipment issue', 'BRIDGE', 'TRACK', 'DELAY', 7, 'Overcast, intermittent gusts', '2025-10-03', 'Track bridge jump with pilot chute hesitation and slightly longer than expected snivel.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('SUBMITTED', 'France', 'Near-miss', 'CLIFF', 'TRACK', 'DELAY', 8, 'Cool, upslope wind', '2025-09-20', 'Track jump with crosswind pushing flight path slightly toward terrain before correction.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('SUBMITTED', 'Italy', 'Line twists', 'BUILDING', 'STATIC', 'PCA', 0, 'Humid, no noticeable wind', '2025-10-07', 'PCA building jump with several line twists cleared by kicking just above hard deck.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('SUBMITTED', 'Norway', 'Near-miss', 'CLIFF', 'TRACK', 'DELAY', 9, 'Cold, clear sky', '2025-09-28', 'Track jump with exit a step closer to edge than planned and slightly lower pitch alt.');

INSERT INTO incident (status, location, category, object_type, jump_type, deploy_method, delay_seconds, weather, occurred_at, summary)
VALUES ('SUBMITTED', 'USA', 'Injury', 'BRIDGE', 'STATIC', 'STATIC_LINE', 0, 'Cool, morning inversion', '2025-10-12', 'Static bridge jump with slider choice and flare timing combining into back-heavy landing.');