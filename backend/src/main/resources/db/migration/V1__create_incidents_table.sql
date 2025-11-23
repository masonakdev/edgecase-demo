CREATE TABLE incident (
    id BIGSERIAL PRIMARY KEY,
    status VARCHAR(16) NOT NULL,
    location VARCHAR(128) NOT NULL DEFAULT 'Undisclosed',
    category VARCHAR(32) NOT NULL,
    object_type VARCHAR(8) NOT NULL,
    jump_type VARCHAR(16) NOT NULL,
    injuries VARCHAR(64) NOT NULL DEFAULT 'Ego, luck jar',
    suit VARCHAR(32) NOT NULL DEFAULT 'Slick',
    canopy VARCHAR(32) NOT NULL DEFAULT 'Unknown',
    container VARCHAR(32) NOT NULL DEFAULT 'Unknown',
    pilot_chute_size INTEGER NOT NULL DEFAULT -1,
    slider_config VARCHAR(8) NOT NULL DEFAULT 'Unknown',
    deploy_method VARCHAR(16) NOT NULL,
    delay_seconds INTEGER NOT NULL,
    weather VARCHAR(128) NOT NULL,
    possible_factors VARCHAR(128) NOT NULL DEFAULT 'None listed',
    occurred_at DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    reviewed_by VARCHAR(32) DEFAULT NULL,
    reviewed_at TIMESTAMP DEFAULT NULL,
    summary TEXT NOT NULL
);

CREATE INDEX idx_incident_status ON incident(status);
CREATE INDEX idx_incident_object_type ON incident(object_type);
CREATE INDEX idx_incident_jump_type ON incident(jump_type);
CREATE INDEX idx_incident_occurred_at ON incident(occurred_at);