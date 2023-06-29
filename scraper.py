import csv
import urllib.request
# from PIL import Image
from bs4 import BeautifulSoup
import requests
# import pandas as pd
from io import BytesIO
import mysql.connector
import json
import time
from selenium import webdriver

headers = ({'User-Agent':
                'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36',
            'Accept-Language': 'en-US, en;q=0.5'})
base_url = "https://mhrise.kiranico.com/"
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="ShadowSlash247",
    database="monster_hunter"
)


class Scraper(object):

    def __init__(self, headers, base_url, mydb):
        self.headers = headers
        self.base_url = base_url
        self.mydb = mydb

    # def __init__(self, headers, base_url):
    #     self.headers = headers
    #     self.base_url = base_url
    #     # self.mydb = mydb

    def get_monsters(self):
        self.get_large_monster()
        self.get_small_monster()

    def get_large_monster(self):
        url = f"{base_url}data/monsters?view=lg"
        session = requests.Session()
        r = session.get(url, headers=headers)
        soup = BeautifulSoup(r.content, "html.parser")
        # print(soup)
        self.get_monster_pages(soup, monster_type="large")

    def get_small_monster(self):
        url = f"{base_url}data/monsters?view=sm"
        session = requests.Session()
        r = session.get(url, headers=headers)
        soup = BeautifulSoup(r.content, "html.parser")
        # print(soup)
        self.get_monster_pages(soup, monster_type="small")

    def get_monster_pages(self, soup, monster_type):
        all_monsters = soup.find_all("div", attrs={
            "class": "group relative p-4 border-r border-b border-gray-200 dark:border-gray-800 sm:p-6"})
        # print(all_monsters)
        for monster in all_monsters:
            # print(monster)
            monster_name = monster.find('a')
            monster_name = monster_name.text.strip()
            monster_img = monster.find('img')["src"]
            link = monster.find('a')['href']
            monster_id = link.split("monsters/")[1]
            print(monster_name)
            # print(link)
            # print(monster_img)
            print(monster_id)

            session = requests.Session()
            r = session.get(link, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            monster_description = soup.find("header", attrs={"class": "mb-9 space-y-1"}).find_all("p")[1].text
            mycursor = mydb.cursor()
            mycursor.execute("SELECT COUNT(*) from monsters WHERE monster_id = %s", [monster_id])
            exists = mycursor.fetchall()
            if exists[0][0] == 0:
                # print("fefeg")
                sql = "INSERT INTO monsters (name, link, image_link, monster_id, description, monster_size) VALUES (%s,%s,%s,%s,%s,%s)"
                val = ([monster_name, link, monster_img, monster_id, monster_description, monster_type])
                mycursor = mydb.cursor()
                # print(mycursor)
                mycursor.execute(sql, val)
                # print(mycursor)
                print(self.get_monster_details(soup, monster_id, monster_type))

            else:
                self.get_monster_details(soup, monster_id, monster_type)
        mydb.commit()

    def get_monster_details(self, soup, monster_id, monster_type):
        # hitzones = []
        self.get_monster_physiology(soup, monster_id)

        # drops = []
        self.get_monster_drops(soup, monster_id)

        # quests = []
        self.get_monster_quests(soup, monster_id)

    def get_monster_physiology(self, soup, monster_id):
        hitzones = []
        monster_hitzones = soup.find_all('table')[0]  # find monster phys table on page
        rows = monster_hitzones.find_all('tr')
        for row in rows:  # extract all important details from the table such as hitzone values for the different weapon types
            hitzone = row.find_all('td')[0].text
            hitzone_state = row.find_all('td')[1].text
            blade_hitzone_value = row.find_all('td')[2].text
            blunt_hitzone_value = row.find_all('td')[3].text
            gunner_hitzone_value = row.find_all('td')[4].text
            fire_hitzone_value = row.find_all('td')[5].text
            water_hitzone_value = row.find_all('td')[6].text
            ice_hitzone_value = row.find_all('td')[7].text
            thunder_hitzone_value = row.find_all('td')[8].text
            dragon_hitzone_value = row.find_all('td')[9].text
            stun_hitzone_value = row.find_all('td')[10].text
            hitzones.append({'hitzone': hitzone, 'state': hitzone_state, 'blade hitzone': blade_hitzone_value,
                             'blunt hitzone': blunt_hitzone_value,
                             'gunner hitzone': gunner_hitzone_value, 'fire hitzone': fire_hitzone_value,
                             'water hitzone': water_hitzone_value,
                             'ice hitzone': ice_hitzone_value, 'thunder hitzone': thunder_hitzone_value,
                             'dragon hitzone': dragon_hitzone_value,
                             'stun': stun_hitzone_value})
        hitzones = json.dumps(hitzones)
        mycursor = mydb.cursor()
        mycursor.execute("UPDATE monsters SET hitzones = %s WHERE monster_id = %s", [hitzones, monster_id])
        # return hitzones
        # return monster_hitzones

    def get_monster_drops(self, soup, monster_id):
        drops = []
        mycursor = mydb.cursor()
        monster_drop_table = soup.find_all('table')[5]  # find monster drop/carves table on page
        rows = monster_drop_table.find_all('tr')
        for row in rows:  # extract all useful information such as the item name, where it can be dropped from, percentage, etc
            item_name = row.find('a').text
            item_id = row.find('a')["href"].split("items/")[1]
            quest_rank = row.find_all("td")[1].text
            method = row.find_all("td")[2].text
            area = row.find_all("td")[3].text
            quantity = row.find_all("td")[4].text
            rate = row.find_all("td")[5].text
            monster_item = {"Item": item_name, "Item id": item_id, "Item Rank": quest_rank, "Drop Method": method,
                            "Drop Area": area,
                            "Quantity": quantity, "Drop Rate": rate}
            drops.append(monster_item)

            mycursor.execute("SELECT COUNT(*) from items WHERE item_id = %s", [item_id])
            exists = mycursor.fetchall()
            if exists[0][0] == 0:
                sql = "INSERT INTO items (item_id) VALUES (%s)"
                val = ([item_id])
                # mycursor = mydb.cursor()
                mycursor.execute(sql, val)
                mycursor.execute("SELECT COUNT(*) from monster_items WHERE monster_id = %s and item_id = %s", [monster_id, item_id])
                exists = mycursor.fetchall()
                if exists[0][0] == 0:
                    sql = "INSERT INTO monster_items (monster_id, item_id) VALUES (%s,%s)"
                    val = ([monster_id, item_id])
                    # mycursor = mydb.cursor()
                    mycursor.execute(sql, val)
                    # print(mycursor)
            else:
                mycursor.execute("SELECT COUNT(*) from monster_items WHERE monster_id = %s and item_id = %s", [monster_id, item_id])
                exists = mycursor.fetchall()
                if exists[0][0] == 0:
                    sql = "INSERT INTO monster_items (monster_id, item_id) VALUES (%s,%s)"
                    val = ([monster_id, item_id])
                    # mycursor = mydb.cursor()
                    mycursor.execute(sql, val)
                    # print(mycursor)

        drops = json.dumps(drops)

        mycursor.execute("UPDATE monsters SET drops = %s WHERE monster_id = %s", [drops, monster_id])

    def get_monster_quests(self, soup, monster_id):
        quests = []
        quest_table = soup.find_all("table")[4]
        rows = quest_table.find_all("tr")
        print(f"Num Quests = {len(rows)}")
        # count = 1
        for row in rows:
            quest_name = row.find("a").text
            quest_link = row.find('a')['href']
            quest_id = quest_link.split("quests/")[1]

            session = requests.Session()
            r = session.get(quest_link, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            quest_objective = \
            soup.find_all("div", attrs={"class": "px-4 py-5 sm:p-6"})[0].text.split("Objective")[1].split("(")[
                0].strip()
            # print(quest_objective)
            hunter_rank_points = \
            soup.find_all("div", attrs={"class": "px-4 py-5 sm:p-6"})[0].text.split("Objective")[1].split("HRP:")[
                1].split("pts")[0].strip()
            # print(hunter_rank_points)
            master_rank_points = \
            soup.find_all("div", attrs={"class": "px-4 py-5 sm:p-6"})[0].text.split("Objective")[1].split("MRP:")[
                1].split("pts")[0].strip()
            # print(master_rank_points)
            failure_conditions = soup.find_all("div", attrs={"class": "px-4 py-5 sm:p-6"})[1].text.split("Conditions")[
                1].strip()
            # print(failure_conditions)

            # sizes_table = soup.find_all("div", attrs={"class": "basis-1/5"})
            sizes_table = soup.find(lambda tag: tag.name == "div" and
                                                "basis-1/5" in tag.get("class", []) and
                                                tag.find("a", href=lambda href: monster_id in href)).find("table")

            # print(sizes_table)
            mini_crown_chances = []
            king_crown_chances = []
            mini_crowns = sizes_table.select(f'tr:has(img[src*="crown_mini"])')
            # print(mini_crowns)
            for mini_crown in mini_crowns:
                size = mini_crown.text.strip().split(" ")[0].replace("\n", "")
                chance = mini_crown.text.strip().split(" ")[-1].replace("\n", "")
                mini_crown_chances.append({size: chance})
            mini_crown_chances = json.dumps(mini_crown_chances)
            print(mini_crown_chances)
            king_crowns = sizes_table.select(f'tr:has(img[src*="crown_king"])')
            for king_crown in king_crowns:
                size = king_crown.text.strip().split(" ")[0].replace("\n", "")
                chance = king_crown.text.strip().split(" ")[-1].replace("\n", "")
                king_crown_chances.append({size: chance})
            king_crown_chances = json.dumps(king_crown_chances)
            print(king_crown_chances)

            quest_rewards_table = soup.find(lambda tag: tag.name == "div" and
                                                        "basis-1/2" in tag.get("class", [])).find("table")
            # print(quest_rewards_table)

            rewards_rows = quest_rewards_table.find_all("tr")
            rewards = []
            for reward_row in rewards_rows:
                # print(reward_row)
                item_name = reward_row.find("a").text
                print(item_name)
                item_id = reward_row.find("a")["href"].split("items/")[1]
                print(item_id)
                quantity = reward_row.find_all("td")[2].text
                print(quantity)
                reward_chance = reward_row.find_all("td")[3].text
                print(reward_chance)
                rewards.append({"Item": item_name, "Item id": item_id, "Quantity": quantity, "Chance": reward_chance})

            rewards = json.dumps(rewards)
            print(rewards)
            quest_details = {"quest_name": quest_name, "quest_url": quest_link, "quest_id": quest_id, "objective": quest_objective,
             "HRP": hunter_rank_points, "MRP": master_rank_points, "failure conditions": failure_conditions}
            print(quest_details)
            # sql = 
            # val = (quest_id,)
            self.save_monster_quests(monster_id, quest_id, quest_details, quest_name, quest_link, quest_objective, hunter_rank_points, master_rank_points,
                    failure_conditions, mini_crown_chances, king_crown_chances, rewards)

        return quests

    def save_monster_quests(self, monster_id, quest_id, quest_details, quest_name, quest_link, quest_objective, hunter_rank_points, master_rank_points,
                                    failure_conditions, mini_crown_chances, king_crown_chances, rewards):
        mycursor = mydb.cursor(buffered=True)
        mycursor.execute("SELECT COUNT(*) from quests WHERE quest_id = %s", [quest_id])
        exists = mycursor.fetchall()
        # print(mycursor)
        # print(exists[0][0])
        # print(rewards)
        # print(quest_link)
        if exists[0][0] == 0:
            print("fefeg")
            # sql = "INSERT INTO quests (quest_id, quest_name, quest_url, objective, HRP, MRP, failure_conditions, mini_crown, king_crown, rewards) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
            # val = ([quest_id, quest_name, quest_link, quest_objective, hunter_rank_points, master_rank_points, failure_conditions,
            #         mini_crown_chances, king_crown_chances, rewards])
            sql = "INSERT INTO quests (quest_id, quest_name, quest_url, objective, HRP, MRP, failure_conditions, mini_crown, king_crown, rewards) VALUES (%s,%s,%s,%s,%s,%s,%s,%s, %s, %s)"
            val = ([quest_id, quest_name, quest_link, quest_objective, hunter_rank_points, master_rank_points,
                    failure_conditions, mini_crown_chances, king_crown_chances, rewards])
            # mycursor = mydb.cursor(buffered=True)
            mycursor.execute(sql, val)
            sql = "INSERT INTO quest_monsters (quest_id, monster_id) VALUES (%s,%s)"
            val = ([quest_id, monster_id])
            # mycursor = mydb.cursor()
            mycursor.execute(sql, val)
            # print(mycursor)
        else:
            # mycursor = mydb.cursor(buffered=True)

            mycursor.execute("SELECT COUNT(*) from quest_monsters WHERE quest_id = %s and monster_id = %s", [quest_id, monster_id])
            exists = mycursor.fetchall()
            if exists[0][0] == 0:
                sql = "INSERT INTO quest_monsters (quest_id, monster_id) VALUES (%s,%s)"
                val = ([quest_id, monster_id])
                # mycursor = mydb.cursor()
                mycursor.execute(sql, val)
                # print(mycursor)


    def get_all_weapons(self):
        weapon_ids = list(range(0, 13))
        url = f"{base_url}data/weapons?view={13}"
        print(url)
        session = requests.Session()
        r = session.get(url, headers=headers)  # need to let page fully load
        soup = BeautifulSoup(r.content, "html.parser")
        # print(soup)
        print(self.get_all_weapon_details(soup, 13))

        # for i in weapon_ids:
        #     url = f"{base_url}data/weapons?view={i}"
        #     session = requests.Session()
        #     r = session.get(url, headers=headers)
        #     soup = BeautifulSoup(r.content, "html.parser")
        #     # print(soup)
        #     print(self.get_all_item_details(soup, i))

    def get_all_weapon_details(self, soup, wpn_id):
        find_weapons = soup.find("table").find_all("tr")
        ggr = soup.find_all("td")[0].find_all("img")[0]["src"]
        print(ggr)
        # print(find_weapons)

        # table_body = table.find('tbody')
        # rows = table_body.find_all('tr')

        elementset = {
            "1": "Fire",
            "2": "Water",
            "3": "Thunder",
            "4": "Ice",
            "5": "Dragon",
            "6": "Poison",
            "7": "Sleep",
            "8": "Paralysis",
            "9": "Blast"
        }

        for weapon in find_weapons:
            # print(weapon)
            try:
                weapon_img = weapon.find_all("td")[0].find_all("img")[0]["src"]
                weapon_name = weapon.find_all("td")[1].find("a").text
                weapon_url = weapon.find_all("td")[1].find("a")["href"]
                weapon_id = weapon_url.split("weapons/")[1]
            except (IndexError, AttributeError) as e:
                weapon_img = ""
                weapon_name = ""
                weapon_url = ""
                weapon_id = 0
            # print(weapon_img)

            # print(weapon_name)

            print(weapon_url)

            # print(weapon_id)
            try:
                find_deco_slots = weapon.find_all("td")[2].find_all("div")[0].find_all("img")
                deco_slots = []
                for deco in find_deco_slots:
                    # print(deco)
                    deco_slots.append(deco["src"].split("ui/")[1].split(".")[0])
            except IndexError:
                deco_slots = []
            # print(deco_slots)

            try:
                find_rampage_slots = weapon.find_all("td")[2].find_all("div")[1].find_all("img")
                # print(find_rampage_slots)
                rampage_slots = []

                for rampage in find_rampage_slots:
                    rampage_slots.append(rampage["src"].split("ui/")[1].split(".")[0])
                # print(rampage_slots)
            except IndexError:
                rampage_slots = []

            attack_val = weapon.find_all("td")[3]
            print("fefefefe")
            print(attack_val)

            additional_property = weapon.find_all("td")[4].find("div")
            # print(additional_property.text.strip())
            if additional_property is not None and "Defense" in additional_property.text.strip():
                additional_property = additional_property.text.strip()
                # print(defense_bonus.text.strip())
                # defense_bonus = additional_property.text

            elif additional_property is not None and "Affinity" in additional_property.text.strip():
                additional_property = additional_property.text.strip()

            print(additional_property)

            elements = []
            element_val = ""  # need to find multiple for weapons with more than one element
            if weapon.find_all("td")[4].find_all("img") != []:
                find_element = weapon.find_all("td")[4].find_all("img")
                ele_count = 0
                for element in find_element:
                    # elements.append(element["src"])
                    print(elementset.get(element["src"].split("Type")[1].split(".png")[0]))
                    element_val = weapon.find_all("span", attrs={"data-key": "elementAttack"})[ele_count].text
                    ele_count += 1
                    print(element_val)
                # print("khk")
            # print(element, element_val)

            # sharpness_set = {"#BE3843": "Red", "#D3673D": "Orange","#C9B232": "Yellow","#81B034": "Green","#3A58D7": "Blue",
            #                  "#E2E2E2": "White","#885AEC": "Purple"}

            sharpness = []
            handicraft_sharpness = []
            try:
                find_base_sharpness = weapon.find_all("td")[5].find_all("svg")[0].find_all("rect")
                # print(find_base_sharpness)

                for bar in find_base_sharpness:
                    # print(bar["width"])
                    sharpness.append(bar["width"])
                print(sharpness)

                find_max_handicraft_sharpness = weapon.find_all("td")[5].find_all("svg")[1].find_all("rect")
                for bar in find_max_handicraft_sharpness:
                    # print(bar["width"])
                    handicraft_sharpness.append(bar["width"])
                print(handicraft_sharpness)
            except IndexError:
                sharpness = []
                handicraft_sharpness = []

            rarity = weapon.find_all("td")[-1].find("small").text.strip()
            print(rarity)
            self.get_weapon_page_details(weapon_url)

            if wpn_id == 5:  # hunting horn section
                print("ok")

                songs = weapon.find_all('div', attrs={"class": "columns-3"})
                songs = [ele.text.strip().split("\n") for ele in songs]
                print(songs)

            if wpn_id == 7:  # gunlance section
                shelling_type = weapon.find('div', attrs={"class": "columns-3"}).text.strip()
                print(shelling_type)

            if wpn_id == 8 or wpn_id == 9:  # switch axe and charge blade section
                phial_type = weapon.find('div', attrs={"class": "columns-3"}).text.strip()
                print(phial_type)

            if wpn_id == 10:
                kinsect_level = weapon.find('div', attrs={"class": "columns-3"}).text.strip()
                print(kinsect_level)

            if wpn_id == 11:
                arc_shot_type = weapon.find_all("td")[5].find_all("div")[0].text.strip()
                charge_shot_levels = weapon.find_all("td")[5].find_all("div", attrs={"class": None})
                # print(charge_shot_levels)
                levels = []
                # for level in charge_shot_levels:
                #     if "class" in level:
                #         print(level)
                charge_shot_levels = [ele.text.strip() for ele in charge_shot_levels]
                coatings = weapon.find_all("td")[6].find_all("div", attrs={"class": ""})
                coatings = [ele.text.strip() for ele in coatings]
                print(arc_shot_type)
                print(charge_shot_levels)
                print(coatings)

            if wpn_id == 12 or wpn_id == 13:  # bowgun scrapping isnt working for some reason
                bowgun_stats = weapon.find_all("td")[5].find_all("div")
                bowgun_stats = [ele.text.strip() for ele in bowgun_stats]
                print(bowgun_stats)

        # if wpn_id == 7 or wpn_id == 8 or wpn_id == 9:  # gunlance/switch axe/charge blade section needs to have phial type and level
        #     print("ok")
        #     # for row in rows:
        #     #     wpn_name = row.find('a')
        #     #     wpn_name = [ele.text.strip() for ele in wpn_name]
        #     #
        #     #     attack_val = row.find('div', attrs={"data-key": "attack"})
        #     #     attack_val = [ele.text.strip() for ele in attack_val]
        #     #
        #     #     element = row.find_all('img')[-1]['src']
        #     #     element_val = ""
        #     #
        #     #     if "Element" in element:
        #     #         element = elementset.get(element.split("Type", 1)[1].split(".png")[0])
        #     #         element_val = row.find('span', attrs={"data-key": "elementAttack"})
        #     #         element_val = [ele.text.strip() for ele in element_val]
        #     #     else:
        #     #         element = ""
        #     #
        #     #     phial_type = row.find_all('div', attrs={"class": "columns-3"})
        #     #     phial_type = [ele.text.strip() for ele in phial_type]
        #     #
        #     #     rarity = row.find_all('small')[-1]
        #     #     rarity_val = [ele.text.strip() for ele in rarity]
        #     #
        #     #     print(wpn_name, attack_val, element, element_val, phial_type, rarity_val)

        # if wpn_id == 10:  # insect glaive section needs to have kinsect level
        #     print("ok")
        #     # for row in rows:
        #     #     wpn_name = row.find('a')
        #     #     wpn_name = [ele.text.strip() for ele in wpn_name]
        #     #
        #     #     attack_val = row.find('div', attrs={"data-key": "attack"})
        #     #     attack_val = [ele.text.strip() for ele in attack_val]
        #     #
        #     #     element = row.find_all('img')[-1]['src']
        #     #     element_val = ""
        #     #
        #     #     if "Element" in element:
        #     #         element = elementset.get(element.split("Type", 1)[1].split(".png")[0])
        #     #         element_val = row.find('span', attrs={"data-key": "elementAttack"})
        #     #         element_val = [ele.text.strip() for ele in element_val]
        #     #     else:
        #     #         element = ""
        #     #
        #     #     kinsect_lvl = row.find_all('div', attrs={"class": "columns-3"})
        #     #     kinsect_lvl = [ele.text.strip() for ele in kinsect_lvl]
        #     #
        #     #     rarity = row.find_all('small')[-1]
        #     #     rarity_val = [ele.text.strip() for ele in rarity]
        #     #
        #     #     print(wpn_name, attack_val, element, element_val, kinsect_lvl, rarity_val)

        # if wpn_id == 11:  # bow section
        #     for row in rows:
        #         wpn_name = row.find('a')
        #         wpn_name = wpn_name.text.strip()

        #         attack_val = row.find('div', attrs={"data-key": "attack"})
        #         attack_val = attack_val.text.strip()

        #         element = row.find_all('img')[-1]['src']
        #         element_val = ""

        #         if "Element" in element:
        #             element = elementset.get(element.split("Type", 1)[1].split(".png")[0])
        #             element_val = row.find('span', attrs={"data-key": "elementAttack"})
        #             element_val = element_val.text.strip()
        #         else:
        #             element = ""

        #         arc_shot = row.find_all('div', attrs={"class": "text-green-500"})[0]
        #         arc_shot = arc_shot.text.strip()

        #         arrow_lvl = row.find_all('small')[3]  # need to remove the arc shot part from the array
        #         arrow_lvl = [ele.text.strip() for ele in arrow_lvl]
        #         arrow_lvl = arrow_lvl[3:]
        #         # arrow_lvl = arrow_lvl[arrow_lvl.index()]

        #         bow_coatings = row.find_all('div', attrs={"class": "columns-3"})
        #         bow_coatings = [ele.text.strip() for ele in bow_coatings]

        #         rarity = row.find_all('small')[-1]
        #         rarity_val = rarity.text.strip()

        #         print(wpn_name, attack_val, element, element_val, arc_shot, arrow_lvl, bow_coatings, rarity_val)

        # if wpn_id == 12 or wpn_id == 13:  # hbg and lbg section will come back to it latr since its the only part breaking
        #     # print("ok")
        #     for row in rows:
        #         wpn_name = row.find('a')
        #         if wpn_name is not None:
        #             wpn_name = [ele.text.strip() for ele in wpn_name]
        #             print(wpn_name)

        #         attack_val = row.find('div', attrs={"data-key": "attack"})
        #         if attack_val is not None:
        #             attack_val = [ele.text.strip() for ele in attack_val]
        #             print(attack_val)
        #         print(attack_val)

        #     #     table = row.find('table')
        #     #     ammo = []
        #     #     if table is not None:
        #     #         gun_info = table.findAll('td')
        #     #         for g in gun_info:
        #     #             gun_info_info = g.find_all('div')
        #     #             if len(gun_info_info) > 0:
        #     #                 drr = [gun_info_info[0].text.strip(), gun_info_info[1].text.strip(), gun_info_info[2].text.strip()]
        #     #                 # print(deviation[0])
        #     #                 print(drr)
        #     #             ammo_info = g.find_all('table')

        #     #             if len(ammo_info) > 0:
        #     #                 # print([ammo_info[0].text.strip().replace("\n", "")])
        #     #                 ammo += [ammo_info[0].text.strip().replace("\n", "")]
        #     #                 print(ammo)
        #     #     # deviation = gun_info.find_all('td')
        #     #     # print(gun_info)
        #     #     # print(deviation)
        #     #     # if deviation is not None:
        #     #     #     print([ele.text.strip() for ele in deviation])

        #     #     rarity_val = row.find_all('small')
        #     #     # print(rarity_val.text)
        #     #     if rarity_val is not None:
        #     #         rarity_val = [ele.text.strip() for ele in rarity_val]
        #     # print(wpn_name)

    def get_weapon_page_details(self, weapon_url):
        session = requests.Session()
        r = session.get(weapon_url, headers=headers)
        soup = BeautifulSoup(r.content, "html.parser")
        weapon_description = soup.find("header", attrs={"class": "mb-9 space-y-1"}).find_all("p")[-1].text
        print(weapon_description)
        try:
            detailed_weapon_img_url = soup.find("a", attrs={"target": "_blank"})["href"]
            print(detailed_weapon_img_url)
        except TypeError:
            detailed_weapon_img_url = None
        find_rampage_augments = soup.find_all("tbody")[0].find_all("td")[-1].find_all("a")
        # print(find_rampage_augments)
        rampage_augments = []
        for augment in find_rampage_augments:
            rampage_augments.append(augment.text.strip())
        print(rampage_augments)

        find_forging_materials = soup.find_all("div", attrs={"class": "basis-1/2"})[0].find_all("tr")
        forging_materials = []

        for material in find_forging_materials:
            item_id = material.find_all("td")[0].find("a")["href"].split("items/")[1]
            # print(item_id)
            quantity = material.find_all("td")[1].text.strip()
            # print(quantity)
            forging_materials.append({"Item ID: ": item_id, "Quantity": quantity})
        print(forging_materials)

        find_upgrade_materials = soup.find_all("div", attrs={"class": "basis-1/2"})[1].find_all("tr")
        upgrade_materials = []

        for material in find_upgrade_materials:
            item_id = material.find_all("td")[0].find("a")["href"].split("items/")[1]
            # print(item_id)
            quantity = material.find_all("td")[1].text.strip()
            # print(quantity)
            upgrade_materials.append({"Item ID: ": item_id, "Quantity": quantity})
        print(upgrade_materials)

    def get_all_items(self):
        # self.get_consumables()
        # print(self.get_materials())
        # self.get_scraps()
        # self.get_ammo()
        # self.get_account_items()
        self.get_room_items()

    def get_consumables(self):
        consumables_url = f"{base_url}data/items?view=consume"
        session = requests.Session()
        r = session.get(consumables_url, headers=headers)
        soup = BeautifulSoup(r.content, "html.parser")
        # print(soup)
        all_consumables = soup.find_all("div", attrs={
            "class": "flex items-center border-r border-b border-gray-200 dark:border-gray-800 p-2 sm:p-1"})

        for consumable in all_consumables:
            item_name = consumable.find("p", attrs={
                "class": "text-sm font-medium text-sky-500 dark:text-sky-400 group-hover:text-sky-900 dark:group-hover:text-sky-300"}).text
            item_img = consumable.find('img')["src"]
            item_url = consumable.find('a')['href']
            item_id = item_url.split("items/")[1]
            session = requests.Session()
            r = session.get(item_url, headers=headers)
            item_page = BeautifulSoup(r.content, "html.parser")
            item_description = item_page.find("header", attrs={"mb-9 space-y-1"}).find_all("p")[-1].text
            print(item_name)
            print(item_description)
            print(item_id)

    def get_materials(self):
        materials_url = f"{base_url}data/items?view=material"
        print(materials_url)
        session = requests.Session()
        r = session.get(materials_url, headers=headers)
        soup = BeautifulSoup(r.content, "html.parser")
        all_materials = soup.find_all("div", attrs={
            "class": "flex items-center border-r border-b border-gray-200 dark:border-gray-800 p-2 sm:p-1"})

        for material in all_materials:
            item_name = material.find("p", attrs={
                "class": "text-sm font-medium text-sky-500 dark:text-sky-400 group-hover:text-sky-900 dark:group-hover:text-sky-300"}).text
            item_img = material.find('img')["src"]
            item_url = material.find('a')['href']
            item_id = item_url.split("items/")[1]
            session = requests.Session()
            r = session.get(item_url, headers=headers)
            item_page = BeautifulSoup(r.content, "html.parser")
            item_description = item_page.find("header", attrs={"mb-9 space-y-1"}).find_all("p")[-1].text
            print(item_name)
            print(item_description)
            print(item_id)
            # print(item_page.find("div", attrs={"basis-1/2"}))
            if item_page.find("div", attrs={"basis-1/2"}) is not None:
                for section in item_page.find_all("div", attrs={"basis-1/2"}):
                    if section.find("h2").text.strip() == "Locale":
                        print("rrhehr")
                        rows = section.find_all("tr")
                        for row in rows:
                            map = row.find_all("td")[0].text.strip()
                            quest_level = row.find_all("td")[1].text.strip()
                            quantity = row.find_all("td")[2].text.strip()
                            chance = row.find_all("td")[3].text.strip()

                            print(map, quest_level, quantity, chance)

                    # if section.find("h2").text.strip() == "Monsters":
                    #     print("rdhhrshr")
                    #     rows = section.find_all("tr")
                    #     for row in rows:
                    #         map = row.find_all("td")[0].text.strip()
                    #         quest_level = row.find_all("td")[1].text.strip()
                    #         quantity = row.find_all("td")[2].text.strip()
                    #         chance = row.find_all("td")[3].text.strip()

                    #         print(map, quest_level, quantity, chance)

    def get_scraps(self):
        scraps_url = f"{base_url}data/items?view=scrap"
        print(scraps_url)
        session = requests.Session()
        r = session.get(scraps_url, headers=headers)
        soup = BeautifulSoup(r.content, "html.parser")
        all_scraps = soup.find_all("div", attrs={
            "class": "flex items-center border-r border-b border-gray-200 dark:border-gray-800 p-2 sm:p-1"})

        for scrap in all_scraps:
            item_name = scrap.find("p", attrs={
                "class": "text-sm font-medium text-sky-500 dark:text-sky-400 group-hover:text-sky-900 dark:group-hover:text-sky-300"}).text
            item_img = scrap.find('img')["src"]
            item_url = scrap.find('a')['href']
            item_id = item_url.split("items/")[1]
            session = requests.Session()
            r = session.get(item_url, headers=headers)
            item_page = BeautifulSoup(r.content, "html.parser")
            item_description = item_page.find("header", attrs={"mb-9 space-y-1"}).find_all("p")[-1].text
            print(item_name)
            print(item_description)
            print(item_id)

    def get_ammo(self):
        ammo_url = f"{base_url}data/items?view=ammo"
        print(ammo_url)
        session = requests.Session()
        r = session.get(ammo_url, headers=headers)
        soup = BeautifulSoup(r.content, "html.parser")
        all_ammo = soup.find_all("div", attrs={
            "class": "flex items-center border-r border-b border-gray-200 dark:border-gray-800 p-2 sm:p-1"})

        for ammo in all_ammo:
            item_name = ammo.find("p", attrs={
                "class": "text-sm font-medium text-sky-500 dark:text-sky-400 group-hover:text-sky-900 dark:group-hover:text-sky-300"}).text
            item_img = ammo.find('img')["src"]
            item_url = ammo.find('a')['href']
            item_id = item_url.split("items/")[1]
            session = requests.Session()
            r = session.get(item_url, headers=headers)
            item_page = BeautifulSoup(r.content, "html.parser")
            item_description = item_page.find("header", attrs={"mb-9 space-y-1"}).find_all("p")[-1].text
            print(item_name)
            print(item_description)
            print(item_id)

    def get_account_items(self):
        account_item_url = f"{base_url}data/items?view=account"
        print(account_item_url)
        session = requests.Session()
        r = session.get(account_item_url, headers=headers)
        soup = BeautifulSoup(r.content, "html.parser")
        all_account_items = soup.find_all("div", attrs={
            "class": "flex items-center border-r border-b border-gray-200 dark:border-gray-800 p-2 sm:p-1"})

        for item in all_account_items:
            item_name = item.find("p", attrs={
                "class": "text-sm font-medium text-sky-500 dark:text-sky-400 group-hover:text-sky-900 dark:group-hover:text-sky-300"}).text
            item_img = item.find('img')["src"]
            item_url = item.find('a')['href']
            item_id = item_url.split("items/")[1]
            session = requests.Session()
            r = session.get(item_url, headers=headers)
            item_page = BeautifulSoup(r.content, "html.parser")
            item_description = item_page.find("header", attrs={"mb-9 space-y-1"}).find_all("p")[-1].text
            print(item_name)
            print(item_description)
            print(item_id)

    def get_room_items(self):
        room_items_url = f"{base_url}data/items?view=antique"
        print(room_items_url)
        session = requests.Session()
        r = session.get(room_items_url, headers=headers)
        soup = BeautifulSoup(r.content, "html.parser")
        all_room_items = soup.find_all("div", attrs={
            "class": "flex items-center border-r border-b border-gray-200 dark:border-gray-800 p-2 sm:p-1"})

        for item in all_room_items:
            item_name = item.find("p", attrs={
                "class": "text-sm font-medium text-sky-500 dark:text-sky-400 group-hover:text-sky-900 dark:group-hover:text-sky-300"}).text
            item_img = item.find('img')["src"]
            item_url = item.find('a')['href']
            item_id = item_url.split("items/")[1]
            session = requests.Session()
            r = session.get(item_url, headers=headers)
            item_page = BeautifulSoup(r.content, "html.parser")
            item_description = item_page.find("header", attrs={"mb-9 space-y-1"}).find_all("p")[-1].text
            print(item_name)
            print(item_description)
            print(item_id)

    def get_skills(self):
        # self.get_armour_skills()
        # self.get_rampage_skills_and_decorations()
        # self.get_decorations()
        # self.get_switch_skills()
        # self.get_dango_skills()
        # self.get_canteen_dango()
        self.get_crafting_list()

    def get_armour_skills(self):
        armour_skills_url = f"{base_url}data/skills"
        session = requests.Session()
        r = session.get(armour_skills_url, headers=headers)
        soup = BeautifulSoup(r.content, "html.parser")
        all_skills = soup.find_all("tr")

        for skill in all_skills:
            skill_name = skill.find("a", attrs={
                "text-sm font-medium text-sky-500 dark:text-sky-400 group-hover:text-sky-900 dark:group-hover:text-sky-300"}).text
            print(skill_name)
            skill_url = skill.find('a')['href']
            print(skill_url)
            skill_id = skill_url.split("skills/")[1]
            print(skill_id)
            skill_description = skill.find("p", attrs={"truncate"}).text
            print(skill_description)
            find_skill_levels = skill.find_all("small")
            skill_levels = []
            for level in find_skill_levels:
                if level.text != "":
                    # print(level.text)
                    skill_levels.append(level.text)
            print(skill_levels)
        # for item in all_room_items:

    def get_rampage_skills_and_decorations(self):
        rampage_skills_url = f"{base_url}data/rampage-skills"
        session = requests.Session()
        r = session.get(rampage_skills_url, headers=headers)
        soup = BeautifulSoup(r.content, "html.parser")
        all_rampage_skills = soup.find_all("tr")

        for rampage_skill in all_rampage_skills:
            skill_name = rampage_skill.find("a").text
            print(skill_name)
            skill_url = rampage_skill.find('a')['href']
            print(skill_url)
            skill_id = skill_url.split("skills/")[1]
            print(skill_id)
            skill_description = rampage_skill.find_all("td")[-1].text
            print(skill_description)

    def get_decorations(self):
        print("gdgeg")
        decorations_url = f"{base_url}data/decorations"
        session = requests.Session()
        r = session.get(decorations_url, headers=headers)
        soup = BeautifulSoup(r.content, "html.parser")
        all_decorations = soup.find_all("tr")

        for decoration in all_decorations:
            decoration_name = decoration.find_all("a")[0].text
            print(decoration_name)
            skill_name = decoration.find_all("a")[1].text
            print(skill_name)
            decoration_url = decoration.find_all('a')[0]['href']
            print(decoration_url)
            skill_url = decoration.find_all('a')[1]['href']
            print(skill_url)
            decoration_id = decoration_url.split("decorations/")[1]
            print(decoration_id)
            skill_id = skill_url.split("skills/")[1]
            print(skill_id)
            skill_level = decoration.find_all("td")[1].find("div").contents[-1].strip()
            print(skill_level)
            skill_description = decoration.find_all("td")[-1].text
            print(skill_description)
            crafting_materials = []

            session = requests.Session()
            r = session.get(decoration_url, headers=headers)
            soup = BeautifulSoup(r.content, "html.parser")
            find_crafting_materials = soup.find_all("table")[-1].find_all("tr")

            for material in find_crafting_materials:
                item_name = material.find("a").text
                # print(item_name)
                item_id = material.find("a")["href"].split("items/")[1]
                quantity = material.find_all("td")[0].contents[-1].strip()
                # print(item_name, item_id, quantity)
                crafting_materials.append({"Item_id": item_id, "Item_name": item_name, "Quantity": quantity})
            print(crafting_materials)

    def get_switch_skills(self):
        switch_skill_url = f"{base_url}data/switch-actions"
        session = requests.Session()
        r = session.get(switch_skill_url, headers=headers)
        soup = BeautifulSoup(r.content, "html.parser")
        all_switch_skills = soup.find_all("tr")

        for switch_skill in all_switch_skills:
            switch_skill_name = switch_skill.find_all("td")[0].text
            print(switch_skill_name)
            switch_skill_description = switch_skill.find_all("td")[1].text
            print(switch_skill_description)

    def get_dango_skills(self):
        dango_skill_url = f"{base_url}data/kitchen-skills"
        session = requests.Session()
        r = session.get(dango_skill_url, headers=headers)
        soup = BeautifulSoup(r.content, "html.parser")
        all_dango_skills = soup.find_all("tr")

        for dango_skill in all_dango_skills:
            dango_skill_name = dango_skill.find_all("td")[0].text
            print(dango_skill_name)
            dango_skill_description = dango_skill.find_all("td")[1].find("p").text
            print(dango_skill_description)
            dango_skill_levels = []
            level_descriptions = dango_skill.find_all("td")[1].find_all("small")

            for description in level_descriptions:
                # print(description)
                dango_skill_levels.append(description.text.strip())
            print(dango_skill_levels)

    def get_canteen_dango(self):
        dango_url = f"{base_url}data/dangos"
        session = requests.Session()
        r = session.get(dango_url, headers=headers)
        soup = BeautifulSoup(r.content, "html.parser")
        all_dango = soup.find_all("tr")

        for dango in all_dango:
            dango_name = dango.find_all("td")[0].text
            print(dango_name)
            find_dango_description = dango.find_all("td")[1].find_all("div")
            dango_description = ""
            dango_skills = []
            for description in find_dango_description:
                dango_description += description.text
                if description.find("a") is not None:
                    dango_skill = description.find("a").text
                    dango_skill_id = description.find("a")["href"].split("skills/")[1]
                    dango_skills.append({dango_skill_id: description.find("a").text})
            print(dango_description)
            print(dango_skills)
            # print(dango_skill)

            # dango_skill_levels = []
            # level_descriptions = dango_skill.find_all("td")[1].find_all("small")

            # for description in level_descriptions:
            #     # print(description)
            #     dango_skill_levels.append(description.text.strip())
            # print(dango_skill_levels)

    def get_crafting_list(self):
        crafting_list_url = f"{base_url}data/item-mix"
        session = requests.Session()
        r = session.get(crafting_list_url, headers=headers)
        soup = BeautifulSoup(r.content, "html.parser")
        all_crafting = soup.find_all("tr")

        for craft in all_crafting:
            craft_num = craft.find_all("td")[0].text
            print(craft_num)
            auto_craft_true = craft.find("path", attrs={"d": "M5 13l4 4L19 7"})
            auto_craft_false = craft.find("path", attrs={"d": "M6 18L18 6M6 6l12 12"})

            if auto_craft_true is not None and auto_craft_false is None:
                auto_craft = True

            elif auto_craft_true is None and auto_craft_false is not None:
                auto_craft = False

            print(auto_craft)

            item_id = craft.find("img")["src"].split("items/")[1].split(".png")[0]
            print(item_id)

            craft_quantity = craft.find_all("td")[3].text
            print(craft_quantity)

            find_ingredients = craft.find_all("td")[4:6]
            ingredients = []

            for ingredient in find_ingredients:
                if ingredient.find("img") is not None:
                    ingredient_id = ingredient.find("img")["src"].split("items/")[1].split(".png")[0]
                    ingredients.append(ingredient_id)

            print(ingredients)


webscrape = Scraper(headers, base_url, mydb)
# webscrape = Scraper(headers, base_url)
# webscrape.get_all_weapons()
webscrape.get_monsters()
# webscrape.get_all_items()
# webscrape.get_skills()
