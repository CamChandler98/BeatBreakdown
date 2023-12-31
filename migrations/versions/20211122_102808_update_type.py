"""update type

Revision ID: 31e3ea55b2b9
Revises: eed69473dc64
Create Date: 2021-11-22 10:28:08.379195

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '31e3ea55b2b9'
down_revision = 'eed69473dc64'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('companies', sa.Column('fractal_index', sa.Float(), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('companies', 'fractal_index')
    # ### end Alembic commands ###
