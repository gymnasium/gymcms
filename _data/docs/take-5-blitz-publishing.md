# Take 5 Publishing - Blitz Edition

**Important Note:** This documentation describes the sequence of tasks required to publish GYM-5002 (i.e. GYM-5001 is currently live)

## Step 1: Create a new branch from (based on the staging branch)

- `git checkout staging`
- `git branch patch/launch-gym-5002`

## Step 2: Configure the (new) daily Take 5 Tutorial

- Edit `_data/take5/GYM-5002.yml` and make the following revisions:
  - Verify that the `date` is in the appropriate format (i.e. `2019-10-28T00:00:00-04:00`)
  - Change `live: false` to `live: true`
  - Change `featured: false` to `featured: true`

## Step 3: _Un-Feature_ the previous Take 5 Tutorial

- Edit `_data/take5/GYM-5001.yml` and make the following revisions:
  - Change `featured: true` to `featured: false`

## Step 4: Make a PR to merge the patch branch into staging

## Step 5: Merge staging into production